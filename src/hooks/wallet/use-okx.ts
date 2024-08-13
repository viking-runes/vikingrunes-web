import { useSnackbar } from '@/components/snackbar';
import config from '@/config';
// import { checkIsBTCAddress } from '@/utils';

import { validate } from 'bitcoin-address-validation';
import { useWallet } from '@/stores/wallet';
import services from '@/service';

const useOkx = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { wallet, setWallet, resetWallet, setLocalWallet } = useWallet();

  const injectedProvider = config.isMainnet ? window.okxwallet?.bitcoin : window.okxwallet?.bitcoinTestnet;

  const walletName = config.walletName.okx;
  const networkName = config.network.okx;

  const getBasicInfo = async () => {
    // const [accounts, publicKey, network] = await Promise.all([injectedProvider.getAccounts(), injectedProvider.getPublicKey(), injectedProvider.getNetwork()]);
    // console.log('🚀 ~ getBasicInfo ~ accounts, publicKey, balance, network:', accounts, publicKey, network);
    // setWallet((prev) => ({
    //   ...prev,
    //   accounts,
    //   publicKey,
    //   network,
    // }));
    // return {
    //   account: accounts[0],
    //   publicKey,
    //   network,
    // };
    // const [network] = await Promise.all([injectedProvider.getNetwork()]);
    // console.log('🚀 ~ getBasicInfo ~ accounts, publicKey, balance, network:', network);
    // return {
    //   network,
    // };
  };

  const handleAccountsChanged = async (account: string, publicKey: string) => {
    if (wallet.address === account) {
      return;
    }

    console.log('🚀 ~ handleAccountsChanged ~ account:', account);

    if (account) {
      const isBTC = validate(account);

      if (isBTC) {
        setLocalWallet(walletName, account, publicKey);

        setWallet((prev) => ({
          ...prev,
          address: account,
          isConnect: true,
          walletName: walletName,
          publicKey,
        }));

        getBasicInfo();

        services.rune.getBalance(account).then((balance) => {
          setWallet((prev) => ({
            ...prev,
            balance,
          }));
        });
      } else {
        enqueueSnackbar('Please connect to the correct btc wallet address', {
          variant: 'error',
        });
        disconnect();
      }
    } else {
      disconnect();
    }
  };

  const disconnect = () => {
    resetWallet();
  };

  const handleNetworkChanged = (network: string) => {
    const currentWallet = window.localStorage.getItem('wallet');
    if (currentWallet !== walletName) {
      return;
    }

    setWallet((prev) => ({ ...prev, network }));
    if (network !== networkName) {
      injectedProvider.switchNetwork(networkName);
    } else {
      closeSnackbar();
      getBasicInfo();
    }
  };

  const connect = async () => {
    try {
      const result = await injectedProvider.connect();

      // const network = await injectedProvider.getNetwork();
      // if (network !== networkName) {
      //   await injectedProvider.switchNetwork(networkName);
      //   // result = await injectedProvider.requestAccounts();
      // }
      // console.log(result);

      handleAccountsChanged(result.address, result.publicKey);
    } catch (error) {
      console.log(error);
      const msg = (error as any)?.message;
      if (msg) {
        enqueueSnackbar('Please connect to the correct btc wallet address', {
          variant: 'error',
        });
      }
    }
  };

  const isWalletInstalled = !!injectedProvider;

  return {
    handleAccountsChanged,
    handleNetworkChanged,
    connect,
    disconnect,
    injectedProvider,
    isWalletInstalled,
  };
};

export default useOkx;
