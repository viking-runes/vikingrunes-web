import { request } from '@/service';
import { parseParams } from '@/utils';

export async function fetchExplorerAllData<R>({ page, tab, all_in_search }: { page: number; tab?: string; all_in_search: string }, holder: boolean) {
  return await request<R>(`
{
    runes(
      pagination: {
        page_no: ${page}
        page_size:30
        ${holder ? `page_sort:"holders desc"` : ''}
      }
      ${parseParams({ tab, all_in_search })}
    )
    {
      items {
        id
        index
        rune_id
        rune_logo
        rune
        mints
        premine
        divisibility
        block {
          start
          end
          current
        }
        terms{amount}
        mintable
        progress{
          blocks_left
          type_name
          percentage
          mint_times
          cap_times
        }
        supply
        symbol
        holders
      }
      pagination {
        page_no
        page_total
      }
    }
  }
  `);
}
