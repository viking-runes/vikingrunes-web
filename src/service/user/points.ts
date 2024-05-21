import { request } from '@/service';

export async function fetchPoint<R>(address: string) {
  return await request<R>(`
   {
    points(
      where:{
        address:"${address}"
      }
    )
    {
      value
    }
  }
  `);
}
