import config from '@/config';

import { validate } from 'bitcoin-address-validation';
import { useWallet } from '@/stores/wallet';
import { useSnackbar } from '@/components/snackbar';
import { useMemo } from 'react';

import { AddressPurpose, getAddress, getProviders, request } from 'sats-connect';
import services from '@/service';

const useXverse = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, setWallet, resetWallet, setLocalWallet } = useWallet();

  const providers = useMemo(() => getProviders(), []);

  const injectedProvider = providers;

  const walletName = 'xverse';

  const getBasicInfo = async () => {
    const response = await request('getInfo', null);

    if (response.status === 'success') {
      // console.log(response.result);
    }
  };

  const handleAccountsChanged = async (account: string, publicKey: string) => {
    if (wallet.address === account) {
      return;
    }

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
    console.log(network);
  };

  const connect = async () => {
    console.log(config.network.xverse);
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: 'VikingRunes Connect',
        network: {
          type: config.network.xverse,
        },
      },
      onFinish: (response) => {
        const address = response.addresses.find((address) => address.addressType === 'p2tr');

        if (address) {
          handleAccountsChanged(address.address, address.publicKey);
        }
      },
      onCancel: () =>
        enqueueSnackbar('Request canceled', {
          variant: 'info',
        }),
    });
  };

  const isWalletInstalled = !!window.XverseProviders;

  return {
    handleAccountsChanged,
    handleNetworkChanged,
    connect,
    disconnect,
    injectedProvider,
    isWalletInstalled,
  };
};

export default useXverse;
