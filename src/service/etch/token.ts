import { request } from '@/service';

export async function fetchSearchToken<R>(search: string, isFee: boolean, fees?: string) {
  return await request<R>(`
  {
  runes(
   where:{
        tab:"all"
        all_in_search:"${search}"
        ${isFee ? `fees_recommended:"${fees}"` : ''}
      }
  )
  {
    items {
        rune_id
        rune
        premine
        mintable
        rune_logo
        symbol
        terms{
          amount
        }
        progress {
          cap_times
          blocks_left
        }
        format_supply
        cap_supply
        block{
          start
          end
        }
        fees_recommended{
          low
          standard
          high
        }
        fees{
          estimate_network_fee_sats
          estimate_network_fee
          service_base_fee_sats
          service_base_fee
          total_sats
          total
          fee_rate
        }
      }
  }
}
  `);
}
