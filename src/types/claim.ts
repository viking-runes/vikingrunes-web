export interface IGraphQLPagination {
  page_no: number;
  page_total: number;
}

export interface IGraphQLCommonData<T> {
  data: T;
}

export interface IGraphQLClaimItemsTable {
  items: IGraphQLClaimItem[];
  pagination: IGraphQLPagination;
}

export interface IGraphQLClaimItem {
  amount: string;
  claim_txid: string;
  locked_time: string;
  reward_data: IGraphQLClaimItemRewarddata;
  stake_data: IGraphQLClaimItemStakedata;
}

interface IGraphQLClaimItemStakedata {
  amount: string;
  asset_name: string;
}

interface IGraphQLClaimItemRewarddata {
  amount: string;
  asset_name: string;
  divisibility: number;
  rune_id: string;
  rune_name: string;
}

export interface IGraphQLClaimTable {
  claim: IGraphQLClaimItemsTable;
}
