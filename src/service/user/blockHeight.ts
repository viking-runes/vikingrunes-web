import { request } from '@/service';

export async function fetchBlockHeight<R>() {
  return await request<R>(`
    {
    cache
    {
      current_block_height
    }
  }
  `);
}
