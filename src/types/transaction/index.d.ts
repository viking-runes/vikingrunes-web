interface IBalanceDetails {
  amount: string;
  div_amount: string;
  divisibility: number;
  rune: string;
  rune_id: string;
  symbol: string;
}

interface ITransactionInput {
  address: string;
  btc: string;
  txid: string;
  balances: IBalanceDetails[];
}

interface ITransactionItem {
  txid: string;
  fee: number;
  fee_rate: number;
  sats: number;
  block_height: number;
  block_time: number;
  vin: ITransactionInput[];
  vout: ITransactionInput[];

  claim_data: {
    is_claim: boolean;
    stake_tx_id: string;
    stake_vout: number;
  };

  stake_data: {
    address: string;
    script: string;
    stake: {
      detail: {
        index: number;
        reward: {
          type: {
            text: string;
            value: number;
          }[];
          value: number;
        };
        stake: {
          type: {
            text: string;
            value: number;
          }[];
          value: number;
        };
        version: number;
      };
      lock_time: number;
      network: {
        bech32: string;
        bip32: {
          private: number;
          public: number;
        };
        pubKeyHash: number;
        scriptHash: number;
        wif: number;
      };
      pubkey: string;
    };
  };
}

interface ITransaction {
  items: ITransactionItem[];
}
