interface IProgressDetails {
  blocks_left: number;
  cap_times: string;
  mint_times: string;
  percentage: number;
  type_name: string;
}
type IDataSource = Record<string, Record<string, string> | string>;

declare interface Window {
  unisat: any;
  okxwallet: any;
  XverseProviders: any;
}
