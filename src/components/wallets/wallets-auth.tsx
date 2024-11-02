import config from '@/config';
import useOkx from '@/hooks/wallet/use-okx';
import useUnisat from '@/hooks/wallet/use-unisat';
// import useXverse from '@/hooks/wallet/use-xverse';
import { useWallet } from '@/stores/wallet';
import { useEffect } from 'react';

const WalletAuth = () => {
  const { getLocalWallet } = useWallet();
  // const xverseHook = useXverse();
  const okxHook = useOkx();
  const unisatHook = useUnisat();

  useEffect(() => {
    // if (!unisatHook.isWalletInstalled) {
    //   return;
    // }

    const currentWallet = getLocalWallet();

    if (currentWallet.walletName === config.walletName.unisat && currentWallet.address && currentWallet.publicKey) {
      unisatHook.autoConnect();
      // unisatHook.handleAccountsChanged(
      //   currentWallet.address,
      //   currentWallet.publicKey,
      // );
    }
  }, []);

  useEffect(() => {
    // if (!okxHook.isWalletInstalled) {
    //   return;
    // }

    const currentWallet = getLocalWallet();

    if (currentWallet.walletName === config.walletName.okx && currentWallet.address && currentWallet.publicKey) {
      okxHook.autoConnect();
      // okxHook.handleAccountsChanged(
      //   currentWallet.address,
      //   currentWallet.publicKey,
      // );
    }
  }, []);

  // useEffect(() => {
  //   // if (!xverseHook.isWalletInstalled) {
  //   //   return;
  //   // }

  //   const currentWallet = getLocalWallet();

  //   if (currentWallet.walletName === config.walletName.xverse) {
  //     if (currentWallet.address && currentWallet.publicKey) {
  //       xverseHook.handleAccountsChanged(currentWallet.address, currentWallet.publicKey);
  //     }
  //   }
  // }, []);

  return <></>;
};

export default WalletAuth;
