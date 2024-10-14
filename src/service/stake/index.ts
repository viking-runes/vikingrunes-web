import config from '@/config';
import axios from 'axios';

export async function fetchPools(body) {
  const { data } = await axios.post(`${config.stakeUrl}/api/v1/pools`, body);

  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchPoolDetail(id) {
  const { data } = await axios.post(`${config.stakeUrl}/api/v1/pool/${id}`);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function txStake(body) {
  const { data } = await axios.post(`${config.stakeUrl}/api/tx/stake`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchOrders(body) {
  const { data } = await axios.post(`${config.stakeUrl}/api/v1/orders`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchOrder(uuid) {
  const { data } = await axios.post(`${config.stakeUrl}/api/v1/order/${uuid}`, {});
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchMintEnv() {
  const { data } = await axios.get(`${config.stakeUrl}/api/freemint/env`);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchWhitelist() {
  const { data } = await axios.get(`${config.stakeUrl}/api/freemint/whitelist`);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchFreeMints(body) {
  const { data } = await axios.post(`${config.stakeUrl}/api/v1/freemints`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export * from './claim';

export * from './stakingOverView';
