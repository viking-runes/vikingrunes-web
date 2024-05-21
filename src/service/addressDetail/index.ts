import { request } from '@/service';
export async function fetchBalanceList<R>(page: number, address: string) {
  return await request<R>(`
   {
    accounts(
      pagination: {
        page_no: ${page}
        page_size:20
        page_sort:"balance desc"
      }
      where:{
        address:"${address}"
      }
    ) 
    {
      items {  
        index
        rune_id
        rune
        rune_logo
        symbol
        balance
        divisibility
      }
      pagination {
        page_no
        page_total
      }
    }
  }
  `);
}
