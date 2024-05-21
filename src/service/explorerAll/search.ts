import { request } from '@/service';

export async function fetchAllSearch<R>(keyword: string) {
  return await request<R>(`
{
    search (
      where:{
        scene:""
        keyword:"${keyword}"
        limit:20
      }
    )
    {
      items{
        keyword
        scene
        extend
      }
    }
  }
`);
}
