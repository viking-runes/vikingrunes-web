import { request } from '@/service';
export async function fetchHolderList<R>(page: number, rune_id: string) {
  return await request<R>(`
   {
    accounts(
      pagination: {
        page_no: ${page}
        page_size:20
        page_sort:"balance desc"
      }
      where:{
        ${rune_id ? `rune_id:"${rune_id}"` : ''}
         tab:"holders"
      }
    ) 
    {
     items {  
        index
        address
        percentage
        balance
      }
      pagination {
        page_no
        page_total
      }
    }
  }
  `);
}
