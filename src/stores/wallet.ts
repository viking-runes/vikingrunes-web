// import { useXverse } from '@/hooks/wallet/use-xverse';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
interface WalletState {
  isConnect: boolean;
  address: string;
  walletName: string;
  network: string;
  publicKey: string;
  balance: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
}

const initialState: WalletState = {
  isConnect: false,
  address: '',
  walletName: '',
  network: '',
  publicKey: '',
  balance: {
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  },
};

const walletAtom = atomWithReset<WalletState>(initialState);

export function useWallet() {
  const [wallet, setWallet] = useAtom(walletAtom);

  const reset = useResetAtom(walletAtom);

  const resetWallet = () => {
    reset();
    setLocalWallet('', '', '');
  };

  const setLocalWallet = (walletName: string, address: string, publicKey: string) => {
    localStorage.setItem('walletName', walletName);
    localStorage.setItem(`walletAddress`, address);
    localStorage.setItem(`walletPublickey`, publicKey);
  };

  const getLocalWallet = () => {
    const walletName = localStorage.getItem('walletName');
    const address = localStorage.getItem(`walletAddress`);
    const publicKey = localStorage.getItem(`walletPublickey`);

    return {
      walletName,
      address,
      publicKey,
    };
  };

  const getSignedPublicKey = () => {
    console.log(wallet.publicKey);
    if (wallet.publicKey.length === 66) {
      return wallet.publicKey.slice(2);
    }

    return wallet.publicKey;
  };

  const checkBalanceEnough = (amount: number) => {
    return wallet.balance.total * 1e8 >= amount;
  };

  return {
    wallet,
    setWallet,
    resetWallet,
    disconnect: resetWallet,
    setLocalWallet,
    getLocalWallet,
    getSignedPublicKey,
    checkBalanceEnough,
  };
}
