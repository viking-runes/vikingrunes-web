import { IResponseCommonList } from '@/types';

export interface IResponseStakeItem {
  runes: IResponseStakeRuneItem[];
  uuid: string;
  title: string;
  batch: string;
  stake_type: string;
  reward_type: string;
  signer: string;
  total: number;
  amount: string;
  staked: string;
  staked_count: number;
  status: string;
  ts_value: number;
  ts_value_type: 'incr' | 'fixed';
  service_fee: number;
  network_vsize: number;
  begin_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface IResponseStakeRuneItem {
  rune: string;
  runeid: string;
  spacedRune: string;
  amount: string;
  symbol: string;
  divisibility: number;
}

export interface IResponseStakePools extends IResponseCommonList<IResponseStakeItem[]> {}

export interface IResponseStakeOrder {
  uuid: string;
  ts_value: number;
  status: string;
  message: string;
  version: number;
  bind_vout: number;
  pool_id: string;
  batch: string;
  network_fee: number;
  staker_pubkey: string;
  staker_address: string;
  createdAt: string;
  updatedAt: string;
  bind_txid: string;
  txid: string;
}

export interface IResponseStakeOrders extends IResponseCommonList<IResponseStakeOrder[]> {}

// export interface IResponseStakeOrderDetail {
//   uuid: string;
//   pool_id: string;
//   batch: string;
//   ts_value: number;
//   status: string;
//   message: string;
//   psbt: string;
//   network_fee: number;
//   staker_pubkey: string;
//   staker_address: string;
//   bind_txid: string;
//   bind_vout: number;
//   txid: string;
//   createdAt: string;
//   updatedAt: string;
//   version: number;
// }
