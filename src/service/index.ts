import * as rune from './rune';
import * as mempool from './mempool';

export async function request<R>(query: string) {
  return new Promise<R>((resolve) => {
    return fetch(`${import.meta.env.VITE_PROJECT_HOST}/graphql/v1`, {
      method: 'POST',
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => resolve(res.data));
  });
}

const services = {
  rune,
  mempool,
};

export default services;
