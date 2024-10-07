import { BitcoinNetworkType } from 'sats-connect';

const networkName = import.meta.env.VITE_NETWORK_TYPE as string;
const isMainnet = networkName === 'mainnet';
const mempoolUrl = isMainnet ? 'https://mempool.space' : 'https://mempool.space/testnet';

const stakeUrl = (import.meta.env.VITE_STAKE_URL as string).includes('/stake') ? import.meta.env.VITE_STAKE_URL : '';

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

  mempoolUrl,
  openDaoHost: `${import.meta.env.VITE_OPEN_DAO_URL}`,

  unisatUrl: `${import.meta.env.VITE_UNISAT_URL}`,
  stakeServiceFee: 5000,

  stakeUrl: stakeUrl,

  links: {
    tx: (txid: string) => `${mempoolUrl}/tx/${txid}`,
  },

  routes: {
    tx: (txid: string) => `/tx/${txid}`,
  },

  protocol: `https://doc.vikingrunes.io/utxo-staking-protocol/introduce`,
  tokenEconomics: 'https://doc.vikingrunes.io/vikingrunes.io/tokenomics',
  roadmap: 'https://doc.vikingrunes.io/vikingrunes.io/roadmap',

  staking: {
    rewardOnce: 1000,
    rewardTotalSupply: 20_000_000,
  },
};

export default config;
