import { request } from '@/service';

export async function fetchRuneDetail<R>(id: string) {
  return await request<R>(`
  {
    runes(
      pagination: {
        page_no: 1
        page_size:1
      }
      where:{
        rune_id:"${id}"
        tab: "detail"
        show_block: true
      }
    )
    {
      items {
        rune_id
        rune
        rune_logo
        premine
        divisibility
        etching
        mints
        mintable
        terms {
          amount
        }
        supply
        symbol
        block_time
        format_supply
        format_holders
        format_transactions
        block {
          start
          end
          current
          end_estimate
        }
        progress {
          blocks_left
          type_name
          percentage
          mint_times
          cap_times
        }
        cap_supply
       }
    }
  }
  `);
}
