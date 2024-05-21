import { request } from '@/service';
import { parseParams } from '@/utils';
interface IParams extends Record<string, string> {
  rune_id?: string;
  tab?: string;
}
export async function fetchTransferList<R>(page: number, params: IParams) {
  return await request<R>(`
   {
    runetxs(
      pagination: {
        page_no: ${page}
        page_size:20
         page_sort:"id desc"
      }
      ${parseParams(params)}
    ) 
    {
      items {
        action
        is_premine
        parent_txid
        block_time
        rune_logo
        from_address
        to_address
        mint_status
        format_amount
        rune_id
        rune

      }
      pagination {
        page_no
        page_total
      }
    }
  }
  `);
}
