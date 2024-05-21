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
}
interface IPagination {
  page_no: number;
  page_total: number;
}
interface IRuneDataResponse {
  items: Array<Record<string, unknown> & IRuneData>;
  pagination: IPagination;
}
