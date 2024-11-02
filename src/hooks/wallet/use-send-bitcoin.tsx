import config from '@/config';
import useOkx from '@/hooks/wallet/use-okx';
import useUnisat from '@/hooks/wallet/use-unisat';
import { useWallet } from '@/stores/wallet';

const useSendBitcoin = () => {
  const { wallet } = useWallet();
  const okxHook = useOkx();
  const unisatHook = useUnisat();

  const sendBitcoin = async (toAddress: string, satoshis: number, options: any = {}) => {
    if (wallet.walletName === config.walletName.unisat) {
      const txid = await unisatHook.injectedProvider?.sendBitcoin(toAddress, satoshis, options);
      return txid;
    }

    if (wallet.walletName === config.walletName.okx) {
      const txid = await okxHook.injectedProvider?.sendBitcoin(toAddress, satoshis, options);
      return txid;
    }
  };

  return {
    sendBitcoin,
  };
};

export default useSendBitcoin;
