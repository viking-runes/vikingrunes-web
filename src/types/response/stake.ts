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
