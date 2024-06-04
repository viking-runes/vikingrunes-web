import { BitcoinNetworkType } from 'sats-connect';

const networkName = import.meta.env.VITE_NETWORK_TYPE as string;
const isMainnet = networkName === 'mainnet';

const config = {
  networkName,
  isMainnet,

  network: {
    unisat: isMainnet ? 'livenet' : 'testnet',
    xverse: isMainnet ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet,
    okx: isMainnet ? 'livenet' : 'testnet',
  },

  walletName: {
    unisat: 'unisat',
    xverse: 'xverse',
    okx: 'okx',
  },

  mempoolUrl: isMainnet ? 'https://mempool.space' : 'https://mempool.space/testnet',
  openDaoHost: `${import.meta.env.VITE_OPEN_DAO_URL}`,

  unisatUrl: `${import.meta.env.VITE_UNISAT_URL}`,
  stakeServiceFee: 5000,

  stakeUrl: `${import.meta.env.VITE_STAKE_URL}`,
};

export default config;
