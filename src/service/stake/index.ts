import axios from 'axios';

export async function fetchPools(body) {
  // const { data } = await axios.post(`${config.stakeUrl}/api/v1/pools`, body);
  const { data } = await axios.post(`/api/v1/pools`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchPoolDetail(id) {
  // const { data } = await axios.post(`${config.stakeUrl}/api/v1/pool/${id}`);
  const { data } = await axios.post(`/api/v1/pool/${id}`);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function txStake(body) {
  const { data } = await axios.post(`/api/tx/stake`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}
