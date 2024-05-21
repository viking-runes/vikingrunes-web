interface MintDetails {
  deadline: number;
  limit: number;
  end: number;
}

interface BlockDetails {
  start: number;
  current: number;
  end: number;
  end_estimate: number;
}

interface IRuneDetailItem {
  rune_id: string;
  rune: string;
  rune_logo: string;
  balance: number;
  premine: number;
  divisibility: number;
  etching: string;
  mints: string[];
  mintable: boolean;
  terms: {
    amount: number;
  };
  supply: number;
  symbol: string;
  block_time: number;
  format_supply: string;
  format_holders: string;
  format_transactions: string;
  block: {
    start: number;
    end: number;
    current: number;
  };
  progress: IProgressDetails;
  cap_supply: number;
}

interface IHolderList {
  items: IHolderItem[];
  pagination: IPagination;
}
interface IHolderItem {
  rank: string;
  address: string;
  percentage: string;
  balance: string;
}
interface ITransactionItem {
  parent_txid: string;
  block_height: number;
  block_time: number;
  from_address: string;
  to_address: string;
  amount: number;
  action: string;
}
interface ITransactionData {
  items: ITransactionItem[];
  pagination: IPagination;
}
