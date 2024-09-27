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
  stake_tx_block_time: number;
  locked_time: number;
  reward_data: IGraphQLClaimItemRewarddata;
  stake_data: IGraphQLClaimItemStakedata;
  stake_txid: string;
  stake_vout: number;
  script_pubkey: string;
  address: string;
  internal_pubkey: string;
  stake_tx_block_time: number;
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
