interface IRuneData {
  id: string;
  rune_id: string;
  rune: string;
  progress: IProgressDetails;
  supply: number;
  symbol: string;
  holders: string;
  premine: number;
  mints: number;
  mintable: boolean;
  divisibility: number;
  terms: { amount: numbr };
  block: {
    start: number;
    end: number;
    current: number;
  };
  viking_format:{
    mints: string;
    current_supply: string;
    current_supply_abb: string;
    amount: string;
    total_supply: string;
    premine: string;
    transactions: string;
    holders: string;
    start_block: string;
    end_before_block: string;
    block_left: number;
    premine_percentage: number;
    fairmint_percentage: number;
  };
}
interface IPagination {
  page_no: number;
  page_total: number;
}
interface IRuneDataResponse {
  items: Array<Record<string, unknown> & IRuneData>;
  pagination: IPagination;
}
