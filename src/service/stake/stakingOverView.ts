import { requestV2 } from '@/service';
export async function fetcStakingOverView<R>(address: string, pk: string) {
  return await requestV2<R>(`
   {
  overview(
    where:{
      address:"${address}"
      internal_pubkey: "${pk}"
    }
  )
  {
    global
    {
      total_btc_locked
      viking_reward_amount
      btc_current_locked
      viking_current_locked
      reward_rune_detail
      {
        rune_id
        rune_name
        divisibility
      }
    }
    my
    {
      btc_balance
      btc_current_locked
      viking_balance
      viking_current_locked
    }
  }
}
  `);
}
