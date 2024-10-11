import config from '@/config';
// import { checkIsBTCAddress } from '@/utils';

import { validate } from 'bitcoin-address-validation';
import { useWallet } from '@/stores/wallet';
import { useSnackbar } from '../../components/snackbar';
import services from '@/service';
import { validateBTCAddress } from '@/utils/validate';

const useUnisat = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { wallet, setWallet, resetWallet, setLocalWallet } = useWallet();
  const injectedProvider = window.unisat;

  const walletName = 'unisat';
  const networkName = config.network.unisat;

  const getBasicInfo = async () => {
    // const [accounts, publicKey, balance, network] = await Promise.all([injectedProvider.getAccounts(), injectedProvider.getPublicKey(), injectedProvider.getBalance(), injectedProvider.getNetwork()]);
    const [publicKey, network] = await Promise.all([injectedProvider.getPublicKey(), injectedProvider.getNetwork()]);
    // console.log('🚀 ~ getBasicInfo ~  publicKey, balance, network:',  publicKey, network);

    setWallet((prev) => ({
      ...prev,
      publicKey,
      network,
    }));

    return {
      publicKey,
      network,
    };
  };

  const handleAccountsChanged = async (account: string) => {
    if (wallet.address === account) {
      return;
    }

    console.log('🚀 ~ handleAccountsChanged ~ account:', account);

    if (account) {
      const isBTC = validateBTCAddress(account);

      if (isBTC) {
        setWallet((prev) => ({
          ...prev,
          address: account,
          isConnect: true,
          walletName: walletName,
        }));

        const walletInfo = await getBasicInfo();

        setLocalWallet(walletName, account, walletInfo.publicKey);

        services.rune.getBalance(account).then((balance) => {
          setWallet((prev) => ({
            ...prev,
            balance,
          }));
        });
      } else {
        enqueueSnackbar(config.invalidAddress, {
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
    if (currentWallet !== 'unisat') {
      return;
    }

    setWallet((prev) => ({ ...prev, network }));
    if (network !== config.network.unisat) {
      injectedProvider.switchNetwork(config.network.unisat);
    } else {
      closeSnackbar();
      getBasicInfo();
    }
  };

  const connect = async () => {
    try {
      let result = await injectedProvider.requestAccounts();

      const network = await injectedProvider.getNetwork();
      if (network !== networkName) {
        await injectedProvider.switchNetwork(networkName);
        result = await injectedProvider.requestAccounts();
      }

      handleAccountsChanged(result[0]);
    } catch (error) {
      console.log(error);
      const msg = (error as any)?.message;
      if (msg) {
        enqueueSnackbar(config.invalidAddress, {
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

export default useUnisat;
