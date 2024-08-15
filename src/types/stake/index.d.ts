interface IOverViewData {
  overview: IOverview;
}

interface IOverview {
  global: IGlobalData;
  my: IMyData;
}

interface IMyData {
  btc_balance: string;
  btc_current_locked: string;
  viking_balance: string;
  viking_current_locked: string;
}

interface IGlobalData {
  btc_current_locked: string;
  reward_rune_detail: IRewardrunedetail;
  total_btc_locked: string;
  viking_current_locked: string;
  viking_reward_amount: string;
}

interface IRewardrunedetail {
  divisibility: number;
  rune_id: string;
  rune_name: string;
}
