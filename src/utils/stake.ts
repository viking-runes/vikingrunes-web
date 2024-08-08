import config from '@/config';
import { IResponseStakeItem } from '@/types';
import { bytesTobase64, bytesToHex, hexTobytes } from '@/utils/format';
import UniSat from '@/utils/unisat';
// import { Script, ScriptNum, SigHash, Transaction, TEST_NETWORK, NETWORK, p2tr } from '@scure/btc-signer';
import * as bitcoinjs from 'bitcoinjs-lib';

import * as ecc from 'tiny-secp256k1';
bitcoinjs.initEccLib(ecc);

const { payments, networks, script, opcodes, Psbt, Transaction } = bitcoinjs;

const unisat_fetch = new UniSat();

// const staker = WIF(Testnet).decode(WALLET_1)
// const pool = WIF(Testnet).decode(WALLET_2)

// console.log(`staker address: `, getAddress('tr', staker, Testnet ))
// console.log(`pool address: `, getAddress('tr', pool, Testnet ))
// console.log(utils.pubSchnorr(staker))

// const lock_time = BigInt(Math.floor(Date.now() / 1000) + 360 * 1000);

// const network = config.isMainnet ? NETWORK : TEST_NETWORK;
const network = config.isMainnet ? networks.bitcoin : networks.testnet;

export async function select_staker_utxo(p2tr_ddress, stake_amount, service_fee) {
  const utxos_result = await unisat_fetch.address_utxo(p2tr_ddress);
  const utxos = utxos_result.data.data;

  // console.log( utxos )
  let selected_utxo;
  for (const u of utxos) {
    if (u.satoshis >= +stake_amount + service_fee) {
      if (selected_utxo) {
        if (selected_utxo.satoshis > u.satoshis) {
          selected_utxo = u;
        }
      } else {
        selected_utxo = u;
      }
    }
  }

  if (!selected_utxo) {
    throw new Error(`No enough utxo, need to megre.`);
  }

  return selected_utxo;
}

export async function select_pool_utxo(pool_p2tr_address) {
  const runes_list_result = await unisat_fetch.runes_list(pool_p2tr_address);
  const runes = runes_list_result.data.data.list;
  // console.log( runes )

  const runes_utxos_result = await unisat_fetch.runes_utxos(pool_p2tr_address, runes[0].runeid);
  // console.log( runes_utxos.data.data )
  const runes_utxos = runes_utxos_result.data.data;
  // for( const ru of runes_utxos ) {
  //     console.log( ru )
  // }
  const selected_utxo = runes_utxos[0];

  return selected_utxo;
}

function lock_script(time, pubkey) {
  console.log(`Lock script params:`, time, bytesToHex(pubkey));

  // pubkey -> hash160(pubkey)

  return script.compile([script.number.encode(time), opcodes.OP_CHECKLOCKTIMEVERIFY, opcodes.OP_DROP, pubkey, opcodes.OP_CHECKSIG]);
}

// const stake_amount = 10000;
// const service_fee = 2000;
// const network_fee = 26000;
// const vsize = 252;

export async function generate_stake_psbt(stakerAddress, stakerPubkey: string, stakePool: IResponseStakeItem, networkFee: number) {
  const tx = new Psbt({
    network: network,
  });

  const locked_script = lock_script(stakePool.ts_value, stakerPubkey);

  const staker_utxo = await select_staker_utxo(stakerAddress, stakePool.amount, stakePool.service_fee + networkFee);

  const commit_p2tr = locked_p2tr(stakerPubkey, locked_script);

  // console.log( Transaction.SIGHASH_SINGLE, Transaction.SIGHASH_ANYONECANPAY, Transaction.SIGHASH_ANYONECANPAY | Transaction.SIGHASH_SINGLE  )
  // console.log( staker_utxo.scriptPk )
  // console.log( BytesToHex(staker.p2tr.internalPubkey ) )

  // tx.setLocktime( lock_time )

  tx.addInput({
    hash: staker_utxo.txid,
    index: staker_utxo.vout,
    // sequence: 0xFFFFFFFE,
    witnessUtxo: {
      script: Buffer.from(staker_utxo.scriptPk, 'hex'),
      // script: staker.p2tr.pubkey,
      value: staker_utxo.satoshis,
    },
    sighashType: Transaction.SIGHASH_ANYONECANPAY | Transaction.SIGHASH_SINGLE,
    tapInternalKey: Buffer.from(stakerPubkey, 'hex'),
    // tapInternalKey: staker.keyPair.publicKey
  });

  tx.addOutput({
    address: commit_p2tr.address,
    value: +stakePool.amount,
  });

  tx.setLocktime(stakePool.ts_value);

  // const psbt = tx.toBase64();
  const psbt = tx.toHex();
  console.log('🚀 ~ generate_stake_psbt ~ psbt:', psbt);

  // tx.signInput(0, stakerPubkey, [Transaction.SIGHASH_ANYONECANPAY | Transaction.SIGHASH_SINGLE]);

  // tx.finalizeInput(0);

  // return tx;
  return psbt;
}

export function op_return_script(stake, reward, index, time, pubkey) {
  const version = 1;

  if (stake > 0xff) return null;
  if (reward > 0xff) return null;
  if (index > 0xff) return null;

  let num = 0;
  num += version;
  num += stake << 8;
  num += reward << 16;
  num += index << 24;

  return script.compile([
    opcodes.OP_RETURN,
    // Buffer.from( [0x16] ),
    opcodes.OP_16,
    script.number.encode(num),
    // script.number.encode(time),
    pubkey,
  ]);
}

function locked_p2tr(pubkey: string, script) {
  const internalPubkey = Buffer.from(pubkey, 'hex');
  return payments.p2tr({
    internalPubkey: internalPubkey,
    scriptTree: {
      output: script,
    },
    redeem: {
      output: script,
      redeemVersion: 192,
    },
    network: network,
  });
}

export async function claim(stakerAddress, stakePool: IResponseStakeItem, stakerPubkey: string, networkFee, txid) {
  const unlock_time = 1722498171;

  const fee = networkFee;
  const locked_script = lock_script(unlock_time, stakerPubkey);

  const commit_p2tr = locked_p2tr(stakerPubkey, locked_script);

  const unlock_tx = {
    hash: txid,
    index: 0,
    witnessUtxo: {
      script: commit_p2tr.output,
      value: +stakePool.amount,
    },
    sighashType: Transaction.SIGHASH_ALL,
    tapInternalKey: commit_p2tr.internalPubkey,
    sequence: 0xfffffffe,
    tapLeafScript: [
      {
        leafVersion: 192,
        script: locked_script,
        controlBlock: commit_p2tr.witness[commit_p2tr.witness.length - 1],
      },
    ],
  };

  const claim_tx = new Psbt({
    network: network,
  });

  claim_tx.setLocktime(unlock_time);

  claim_tx.addInput(unlock_tx);

  claim_tx.addOutput({
    address: stakerAddress,
    value: +stakePool.amount - fee,
  });

  // use plugin
  claim_tx.signInput(0, staker.keyPair, [Transaction.SIGHASH_ALL]);

  claim_tx.finalizeInput(0);

  const tx_hex = claim_tx.extractTransaction(true).toHex();

  console.log(tx_hex);

  const broadcast_result = await unisat_fetch.broadcast(tx_hex).catch((e) => {
    console.log(e.code, e.message);
    return e.response;
  });

  console.log(`claim hash: `, broadcast_result.data);
}

// (async () => {
//   const stake_psbt = await genrate_stake_psbt();

//   const stake_psbt_hex = BytesToHex(stake_psbt.toPSBT(0));

//   const stake_tx = Transaction.fromPSBT(HexToBytes(stake_psbt_hex));

//   const stake_input = stake_tx.getInput(0);
//   const stake_output = stake_tx.getOutput(0);

//   const pool_utxo = await select_pool_utxo();

//   const tx = new Transaction({
//     network: Testnet,
//     allowUnknownOutputs: true,
//   });

//   // finalScriptWitness
//   // console.log( stake_input )
//   tx.addInput({
//     txid: stake_input.txid,
//     index: stake_input.index,
//     witnessUtxo: stake_input.witnessUtxo,
//     // sighashType: SigHash.SINGLE_ANYONECANPAY ,
//     tapInternalKey: staker.p2tr.tapInternalKey,
//   });

//   tx.addInput({
//     txid: pool_utxo.txid,
//     index: pool_utxo.vout,
//     witnessUtxo: {
//       script: pool.p2tr.script,
//       amount: BigInt(pool_utxo.satoshis),
//     },
//     sighashType: SigHash.ALL_ANYONECANPAY,
//     tapInternalKey: pool.p2tr.tapInternalKey,
//   });

//   tx.addOutput(stake_output);

//   // tx.addOutput({
//   //     script: ,
//   //     amount: BigInt( service_fee + pool_utxo.satoshis )
//   // })
//   tx.addOutputAddress(pool.p2tr.address, BigInt(service_fee + pool_utxo.satoshis), Testnet);

//   // refund.
//   // tx.addOutputAddress(
//   //     staker.p2tr.address,
//   //     BigInt( stake_input.witnessScript.amount - service_fee - network_fee),
//   // )

//   tx.addOutput({
//     script: op_return_script(1, 1),
//     amount: 0n,
//   });

//   tx.signIdx(pool.privKey, 1, [SigHash.ALL_ANYONECANPAY]);

//   tx.finalizeIdx(1);

//   tx.inputs[0].finalScriptWitness = stake_input.finalScriptWitness;

//   // const tx_hex = BytesToHex(tx.toPSBT())

//   const tx_hex = BytesToHex(tx.extract());

//   console.log(tx_hex);

//   const broadcast_result = await unisat_fetch.broadcast(tx_hex).catch((e) => {
//     console.log(e.code, e.message);
//     return e.response;
//   });

//   console.log(broadcast_result);

//   // console.log( op_return_script(1,1))
// })();
