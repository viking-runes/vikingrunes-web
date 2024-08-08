require('dotenv').config()

const bitcoinjs = require('bitcoinjs-lib')
const { ECPairFactory } = require('ecpair')
const { BIP32Factory } = require('bip32')
const bip39 = require('bip39')
const bip65 = require('bip65')

const { UniSat } = require('./fetch')
const { BytesToHex, HexToBytes } = require('./hash')

const ecc = require('tiny-secp256k1')

bitcoinjs.initEccLib(ecc)

const ECPair = ECPairFactory(ecc)
const bip32 = BIP32Factory(ecc)
const unisat_fetch = new UniSat()

const { payments, networks, script, opcodes, Psbt, Transaction } = bitcoinjs

const testnet = networks.testnet

const { WALLET_1, WALLET_2 } = process.env

class Wallet {
    constructor(wif, network_type) {
        this.wif = wif
        this.network = network_type
        this.keyPair = ECPair.fromWIF(wif, this.network )
        this.pubkey = this.keyPair.publicKey
        this.internalPubkey = this.toXOnly(this.pubkey)
        this.p2tr = this.publicKeyToTaproot()
        this.tweak_signer = this.tweakSigner()

    //     this.rootKey = bip32.fromPrivateKey(this.keyPair.privateKey , this.childNode.chainCode)
    //     this.childNode = this.rootKey.derivePath( `m/86'/0'/0'/0/0` )

    //     console.log(`chain_code:`, this.childNode )
    //     this.childNodeXOnlyPubkey = this.toXOnly(this.childNode.publicKey, testnet )
    //     this.twweakedChildNode = this.childNode.tweak(
    //         bitcoinjs.crypto.taggedHash(`TapTweak`, this.childNodeXOnlyPubkey)
    //     )
    }

    publicKeyToTaproot() {
        return payments.p2tr({ 
            internalPubkey: this.internalPubkey, 
            network: this.network 
        })
    }

    toXOnly(pubKey) {
        return pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
    }

    tweakSigner(opts) {
        opts = opts || {}
        let privateKey = this.keyPair.privateKey 
        
        // console.log( privateKey )
        if( this.keyPair.publicKey[0] === 3 ) {
            privateKey = ecc.privateNegate(privateKey)
        }

        const tweakedPrivateKey = ecc.privateAdd(
            privateKey,
            this.tapTweakHash( this.internalPubkey, opts.tweakHash )
        )

        return ECPair.fromPrivateKey( Buffer.from(tweakedPrivateKey), {
            network: this.network
        } )
    }

    tapTweakHash( pubkey, hash ) {
        return bitcoinjs.crypto.taggedHash(
            `TapTweak`,  
            Buffer.concat( hash ? [pubkey, hash] : [pubkey] )
        )
    }
}

const staker = new Wallet(WALLET_1, testnet )

const pool = new Wallet(WALLET_2, testnet )

const lock_time = Math.floor( Date.now() / 1000 ) + 30*60     // add 30min

const stake_amount = 10000
const service_fee = 2000 // 2000 
const vsize = 310
const network_fee = vsize * 1

// ------------ claim begin ----- /*
;( async ()=> {

    const unlock_time = 1722498171
    const txid = `11ddec6e462d31549f95e40977e3c934e642d4a25a4eac6931af81fd0c784668`


    const fee = 140
    const locked_script = lock_script( unlock_time, staker.internalPubkey ) 

    const commit_p2tr = locked_p2tr( staker.internalPubkey, locked_script, testnet )

    const unlock_tx = {
        hash: txid,
        index: 0,
        witnessUtxo: {
            script: commit_p2tr.output,
            value: stake_amount
        },
        sighashType: Transaction.SIGHASH_ALL, 
        tapInternalKey: commit_p2tr.internalPubkey,
        sequence: 0xFFFFFFFE,
        tapLeafScript: [{
            leafVersion: 192,
            script: locked_script,
            controlBlock: commit_p2tr.witness[commit_p2tr.witness.length - 1 ] 
        }]
    }

    const claim_tx = new Psbt({
        network: testnet
    })

    claim_tx.setLocktime( unlock_time )
    
    claim_tx.addInput( unlock_tx )
    
    claim_tx.addOutput({
        address: staker.p2tr.address,
        value: stake_amount - fee
    })

    claim_tx.signInput( 0, staker.keyPair, [
        Transaction.SIGHASH_ALL
    ])

    claim_tx.finalizeInput(0)

    const tx_hex = claim_tx.extractTransaction(true).toHex()

    console.log( tx_hex)

    const broadcast_result = await unisat_fetch.broadcast( tx_hex ).catch( e=> {
        console.log(e.code , e.message )
        return e.response
    })

    console.log(`claim hash: `, broadcast_result.data )
    
})()
// --------------- claim end  */


//---------------------------  stake start ----   
/*
;( async() => {

    const return_script = op_return_script( 1, 2, 1, lock_time, staker.internalPubkey )

    const stake_tx = await generate_stake_psbt()
    
    const stake_input = stake_tx.data.inputs[0]
    const stake_output = stake_tx.txOutputs[0]

    const pool_utxo = await select_pool_utxo()

    const tx = new Psbt({ 
        network: testnet,
    })

    //add stake info 
    tx.addInput({
        hash: stake_tx.txInputs[0].hash,
        index: stake_tx.txInputs[0].index,
        sequence: stake_tx.txInputs[0].sequence,
        witnessUtxo: stake_input.witnessUtxo,
        // sequence: 0xFFFFFFFE,
    })

    // add pool info 
    tx.addInput({
        hash: pool_utxo.txid,
        index: pool_utxo.vout,
        witnessUtxo: {
            script: Buffer.from(pool_utxo.scriptPk, 'hex'),
            value: pool_utxo.satoshis
        },
        // sequence: 0xFFFFFFFE,
        sighashType: Transaction.SIGHASH_ALL,
        tapInternalKey: pool.p2tr.internalPubkey
    })

    tx.addOutput(stake_output)

    tx.addOutput({
        script: pool.p2tr.output,
        value: service_fee + pool_utxo.satoshis
    })

    const remainingValue = stake_input.witnessUtxo.value - service_fee - network_fee - stake_amount
    if( remainingValue > 0 ) {
        tx.addOutput({
            script: staker.p2tr.output,
            value: remainingValue
        })
    }

    tx.addOutput({
        script: return_script,
        value: 0
    })

    tx.setLocktime( lock_time )

    tx.signInput( 1, pool.tweak_signer, [
        Transaction.SIGHASH_ALL
    ] )

    tx.finalizeInput(1)

    tx.data.inputs[0].finalScriptWitness = stake_input.finalScriptWitness

    const extracted_tx = tx.extractTransaction(true)

    console.log( extracted_tx )

    const tx_hex = extracted_tx.toHex()

    console.log( tx_hex)
    const broadcast_result = await unisat_fetch.broadcast( tx_hex ).catch( e=> {
        console.log(e.code , e.message )
        return e.response
    })

    console.log( broadcast_result.data )

    // console.log(tx.extractTransaction(true) )

})()

//---------------  stake end ------------------- 
*/ 

async function generate_stake_psbt() {
    
    const tx = new Psbt({
        network: testnet
    })

    const locked_script = lock_script( lock_time, staker.internalPubkey )
    const staker_utxo = await select_staker_utxo( stake_amount + network_fee, service_fee )

    const commit_p2tr = locked_p2tr( staker.internalPubkey, locked_script, testnet )

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
            value: staker_utxo.satoshis
        },
        sighashType: Transaction.SIGHASH_ANYONECANPAY | Transaction.SIGHASH_SINGLE ,
        tapInternalKey: staker.p2tr.internalPubkey
        // tapInternalKey: staker.keyPair.publicKey
    })

    tx.addOutput({
        address: commit_p2tr.address,
        value: stake_amount
    })

    tx.setLocktime( lock_time )

    tx.signInput(0, staker.tweak_signer, [
        Transaction.SIGHASH_ANYONECANPAY | Transaction.SIGHASH_SINGLE
    ] )

    tx.finalizeInput(0)

    return tx 

}

function locked_p2tr( pubkey, script, network_type ) {
    return payments.p2tr({
        internalPubkey: pubkey,
        scriptTree: {
            output: script,
        },
        redeem: {
            output: script, 
            redeemVersion: 192
        },
        network: network_type
    })
}


function op_return_script( stake, reward, index, time, pubkey ) {
    const version = 1 
    
    if( stake > 0xFF ) return null 
    if( reward > 0xFF ) return null 
    if( index > 0xFF ) return null 

    let num = 0 
    num += version 
    num += stake << 8
    num += reward << 16 
    num += index << 24

    return script.compile([
        opcodes.OP_RETURN,
        // Buffer.from( [0x16] ),
        opcodes.OP_16,
        script.number.encode(num),
        // script.number.encode(time),
        pubkey
    ])
}

function lock_script( time, pubkey ) {
    console.log(`Lock script params:`, time, BytesToHex(pubkey) )

    // pubkey -> hash160(pubkey)

    return script.compile([
        script.number.encode(time),
        opcodes.OP_CHECKLOCKTIMEVERIFY,
        opcodes.OP_DROP,
        pubkey,
        opcodes.OP_CHECKSIG
    ])
}

async function select_staker_utxo(stake_amount, service_fee) {
    const utxos_result = await unisat_fetch.address_utxo( staker.p2tr.address )
    const utxos = utxos_result.data.data

    // console.log( utxos )
    let selected_utxo 
    for( const u of utxos ) {
        if( u.satoshis >= (stake_amount + service_fee) ) {
            if( selected_utxo ) {
                if( selected_utxo.satoshis > u.satoshis ) {
                    selected_utxo = u 
                }
            } else {
                selected_utxo = u 
            }
        }
    }

    if( !selected_utxo ) {
        console.log(`No enough utxo, need to megre .`)
        return 
    }

    return selected_utxo
}

async function select_pool_utxo() {
    console.log(`pool address:`, pool.p2tr.address )
    const runes_list_result = await unisat_fetch.runes_list( pool.p2tr.address )
    const runes = runes_list_result.data.data.list
    console.log( runes_list_result.data )

    const runes_utxos_result = await unisat_fetch.runes_utxos( pool.p2tr.address, runes[0].runeid )
    // console.log( runes_utxos.data.data )
    const runes_utxos = runes_utxos_result.data.data 
    // for( const ru of runes_utxos ) {
    //     console.log( ru )   
    // }
    const selected_utxo = runes_utxos[0]

    return selected_utxo
}