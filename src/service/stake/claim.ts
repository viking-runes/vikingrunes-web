import { requestV2 } from '@/service';

export async function fetchClaimTable<R>(page: number, address: string) {
  return await requestV2<R>(`
    {
  claim(
    pagination: {
      page_no: ${page}
      page_size:10
    }
    where:{
      address:"${address}"
    }
  )
  {
    items {
      stake_data
      {
        asset_name
        amount
      }
      claim_txid
      locked_time
      amount
      reward_data
      {
        asset_name
        rune_id
        rune_name
        amount
        divisibility
      }
    }
    pagination {
      page_no
      page_total
    }
  }
}
  `);
}
