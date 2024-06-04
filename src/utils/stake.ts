import UniSat from '@/utils/unisat';
import { nsaction, WIF, utils, p2tr, Script, ScriptNum, OP, SigHash, TEST_NETWORK } from '@scure/btc-signer';

const unisat_fetch = new UniSat();

// const staker = WIF(Testnet).decode(WALLET_1)
// const pool = WIF(Testnet).decode(WALLET_2)

// console.log(`staker address: `, getAddress('tr', staker, Testnet ))
// console.log(`pool address: `, getAddress('tr', pool, Testnet ))
// console.log(utils.pubSchnorr(staker))

const lock_time = BigInt(Math.floor(Date.now() / 1000) + 360 * 1000);

export async function select_staker_utxo(p2tr_ddress, stake_amount, service_fee) {
  const utxos_result = await unisat_fetch.address_utxo(p2tr_ddress);
  const utxos = utxos_result.data.data;

  // console.log( utxos )
  let selected_utxo;
  for (const u of utxos) {
    if (u.satoshis >= stake_amount + service_fee) {
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

/**
 *
 * @param {*} type
 *      1 - btc
 *      2 - rune
 *      3 - ordinals
 *      4 - arc20
 * @param {*} index
 *      output index
 * @returns
 */
export function op_return_script(type, index) {
  const tag = `vikingstaking test ${type} ${index}`;
  // return  bitcoin.script.compile([
  //     bitcoin.opcodes.OP_RETURN,
  //     Buffer.from(`${tag} ${type} ${index}`)
  // ])
  // return Script.encode([
  //     OP.RETURN,
  //     Buffer.from(tag)
  // ])
  return Script.encode(['RETURN', Buffer.from(tag)]);
}

function lock_script(time, pubkey) {
  return Script.encode([ScriptNum().encode(time), 'CHECKLOCKTIMEVERIFY', 'DROP', Buffer.from(pubkey, 'hex'), 'CHECKSIG']);
}

const stake_amount = 10000;
const service_fee = 2000;
const network_fee = 26000;
const vsize = 252;

export async function genrate_stake_psbt(p2tr_ddress) {
  const tx = new Transaction({
    network: Testnet,
    // allowUnknowOutput: true,
    allowUnknownOutputs: true,
  });

  const stake_utxo = await select_staker_utxo(p2tr_ddress, stake_amount, service_fee + network_fee);

  tx.addInput({
    txid: stake_utxo.txid,
    index: stake_utxo.vout,
    witnessUtxo: {
      script: staker.p2tr.script,
      amount: BigInt(stake_utxo.satoshis),
    },
    sighashType: SigHash.SINGLE_ANYONECANPAY,
    tapInternalKey: staker.p2tr.tapInternalKey,
  });

  tx.addOutput({
    script: lock_script(lock_time, staker.pubkey),
    amount: BigInt(stake_amount),
  });

  // console.log( tx.inputs )
  const idx = tx.sign(staker.privKey, [SigHash.SINGLE_ANYONECANPAY]);

  tx.finalizeIdx(0);

  return tx;
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
