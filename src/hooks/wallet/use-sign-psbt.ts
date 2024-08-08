import config from '@/config';
import useOkx from '@/hooks/wallet/use-okx';
import useUnisat from '@/hooks/wallet/use-unisat';
import { useWallet } from '@/stores/wallet';
import { base64ToHex, hexToBase64 } from '@/utils/format';
import { signTransaction } from 'sats-connect';

import * as btc from '@scure/btc-signer';
import services from '@/service';

import * as bitcoin from 'bitcoinjs-lib';
// import { Transaction } from '@scure/btc-signer';

// import XverseConnector from 'sats-connect';

const extractTransaction = (psbtHex: string) => {
  const psbt = bitcoin.Psbt.fromHex(psbtHex);
  const transaction = psbt.extractTransaction();
  return transaction.toHex();
};

const useSignPsbt = () => {
  const { wallet } = useWallet();
  const okxHook = useOkx();
  const unisatHook = useUnisat();

  const signPsbt = async (psbtBase64: string, signIndexes: string[] = []) => {
    const signingIndexes = signIndexes.map((index) => +index);

    if (wallet.walletName === config.walletName.xverse) {
      // try {
      //   const response = await XverseConnector.request('signPsbt', {
      //     psbt: psbtBase64,
      //     allowedSignHash: btc.SigHash.SINGLE | btc.SigHash.DEFAULT_ANYONECANPAY,
      //     broadcast: false,
      //     signInputs: {
      //       [wallet.address]: signingIndexes,
      //     },
      //   });
      //   if (response.status === 'success') {
      //     // handle success response
      //     console.log(response);

      //     const signedPsbt = base64ToHex(response.result.psbt);
      //     console.log(base64ToHex(psbtBase64));
      //     const rawtx = extractTransaction(signedPsbt);
      //     debugger;
      //   }
      //   // else {
      //   //   if (response.error.code === RpcErrorCode.USER_REJECTION) {
      //   //     // handle user request cancelation
      //   //   } else {
      //   //     // handle error
      //   //   }
      //   // }
      // } catch (err) {
      //   console.log(err);
      // }

      return new Promise((resolve, reject) => {
        signTransaction({
          payload: {
            network: {
              type: config.network.xverse,
            },
            message: 'Sign Transaction',
            psbtBase64: psbtBase64,
            broadcast: true,
            inputsToSign: [
              {
                address: wallet.address,
                signingIndexes: signingIndexes,
                sigHash: btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY,
              },
            ],
          },
          onFinish: async (response) => {
            // const tx = Transaction.fromPSBT(bitcoin.Psbt.fromBase64(response.psbtBase64).toBuffer());
            // tx.extract();
            // const rawtx = tx.hex;
            // // const signedPsbt = base64ToHex(response.psbtBase64);
            // // console.log(base64ToHex(psbtBase64));
            // // console.log(signedPsbt);
            // // const rawtx = extractTransaction(signedPsbt);
            // const txid = await services.mempool.pushTx(rawtx);
            // resolve(txid);
            resolve(response.txId);
          },
          onCancel: () => {
            reject();
            console.info('Canceled');
          },
        });
      });
    }

    const psbtHex = base64ToHex(psbtBase64);
    if (wallet.walletName === config.walletName.unisat) {
      // const toSignInputs = signingIndexes.map((index) => {
      //   return {
      //     index: +index,
      //     publicKey: wallet.publicKey,
      //     sighashTypes: [btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY],
      //   };
      // });

      const signedPsbt = await unisatHook.injectedProvider?.signPsbt(psbtHex, {
        autoFinalized: true,
        // toSignInputs,
      });

      const rawtx = extractTransaction(signedPsbt);

      const txid = await services.mempool.pushTx(rawtx);

      return txid;
    }

    if (wallet.walletName === config.walletName.okx) {
      const signedPsbt = await okxHook.injectedProvider?.signPsbt(psbtHex, {
        autoFinalized: true,
      });

      const rawtx = extractTransaction(signedPsbt);

      const txid = await services.mempool.pushTx(rawtx);

      return txid;
    }
  };

  const signPsbtWthoutBroadcast = async (psbtHex: string, signIndexes: string[] = []) => {
    const signingIndexes = signIndexes.map((index) => +index);

    if (wallet.walletName === config.walletName.xverse) {
      return new Promise((resolve, reject) => {
        signTransaction({
          payload: {
            network: {
              type: config.network.xverse,
            },
            message: 'Sign Transaction',
            psbtBase64: hexToBase64(psbtHex),
            broadcast: false,
            inputsToSign: [
              {
                address: wallet.address,
                signingIndexes: signingIndexes,
                sigHash: btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY,
              },
            ],
          },
          onFinish: async (response) => {
            debugger;
            // const tx = Transaction.fromPSBT(bitcoin.Psbt.fromBase64(response.psbtBase64).toBuffer());
            // tx.extract();
            // const rawtx = tx.hex;
            // // const signedPsbt = base64ToHex(response.psbtBase64);
            // // console.log(base64ToHex(psbtBase64));
            // // console.log(signedPsbt);
            // // const rawtx = extractTransaction(signedPsbt);
            // const txid = await services.mempool.pushTx(rawtx);
            // resolve(txid);
            resolve(response.psbtBase64);
          },
          onCancel: () => {
            reject();
            console.info('Canceled');
          },
        });
      });
    }

    if (wallet.walletName === config.walletName.unisat) {
      const signedPsbt = await unisatHook.injectedProvider?.signPsbt(psbtHex, {
        autoFinalized: true,
        disableTweakSigner: true,
        // toSignInputs,
      });

      return signedPsbt;

      // const rawtx = extractTransaction(signedPsbt);
    }

    if (wallet.walletName === config.walletName.okx) {
      const signedPsbt = await okxHook.injectedProvider?.signPsbt(psbtHex, {
        autoFinalized: true,
      });

      return signedPsbt;
    }
  };

  return {
    signPsbt,
    signPsbtWthoutBroadcast,
  };
};

export default useSignPsbt;
