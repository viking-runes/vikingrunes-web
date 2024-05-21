import { request } from '@/service';
export async function fetchTransaction<R>(id: string) {
  return await request<R>(`
   {
 txs(
      pagination: {
        page_no: 1
        page_size:1
      }
      where:{
        txid:"${id}"
         show_sats:true
      }
    ) 
{
      items {    
        txid
        fee
        fee_rate
        sats
        block_height
        block_time
        vin
        {
          address
          btc
          txid
          balances
          {
            div_amount
          }
        }
        vout
        {
          address
          btc
          txid
          balances
          {
            div_amount
          }
        }
      }
    }
  }
  `);
}
