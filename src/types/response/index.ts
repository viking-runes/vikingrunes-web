export interface IResponseBalance {
  confirmed: BalanceItem;
  pending: BalanceItem;
  usd: string;
}

interface BalanceItem {
  amount: string;
  btc_amount: string;
  inscription_amount: string;
}
