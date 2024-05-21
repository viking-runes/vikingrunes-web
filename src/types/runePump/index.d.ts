interface IBoardMint {
  rune_id: string;
  rune_name: string;
  rune_logo: string;
  progress: string;
  mint_times_4h: string;
  address_times: string;
  rank_level: number;
}
type TBoardItem = Partial<IBoardMint | IBoardTransactions>;
interface IBoardTransactions {
  rune_id: string;
  rune_name: string;
  rune_logo: string;
  from_address: string;
  from_address_times: string;
  to_address: string;
  to_address_times: string;
  transactions_24h: string;
  rank_level: string;
}
interface IBoard {
  mints: IBoardMint[];
  transactions: IBoardTransactions[];
}
