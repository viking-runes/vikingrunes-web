interface IBalanceDetails {
  div_amount: string;
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
}

interface ITransaction {
  items: ITransactionItem[];
}
