import { requestV2 } from '@/service';

export async function fetchClaimTable<R>(page: number, pk: string) {
  return await requestV2<R>(`
    {
  claim(
    pagination: {
      page_no: ${page}
      page_size:10
    }
    where:{
      internal_pubkey:"${pk}"
    }
  )
  {
    items {
      address
      stake_txid
      stake_vout
      stake_data
      {
        asset_name
        amount
      }
      claim_txid
      stake_tx_block_time
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
      script_pubkey
      internal_pubkey
    }
    pagination {
      page_no
      page_total
    }
  }
  }

  `);
}
