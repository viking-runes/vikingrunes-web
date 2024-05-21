import { request } from '@/service';

export async function fetchBoard<R>() {
  return await request<R>(`  {
    board
    {
      mints {
        rune_id
        rune_name
        rune_logo
        progress
        mint_times_4h
        address_times
        rank_level
      }
      transactions {
        rune_id
        rune_name
        rune_logo
        from_address
        from_address_times
        to_address
        to_address_times
        transactions_24h
        rank_level
      }
    }
  }`);
}
