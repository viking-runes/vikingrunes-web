import axios from 'axios';

export async function fetchPools(body) {
  // const { data } = await axios.post(`${config.stakeUrl}/api/v1/pools`, body);
  // const { data } = await axios.post(`/stake/api/v1/pools`, body);
  const { data } = await axios.post(`https://apit.vikingrunes.io/stake/api/v1/pools`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchPoolDetail(id) {
  // const { data } = await axios.post(`${config.stakeUrl}/stake/api/v1/pool/${id}`);
  const { data } = await axios.post(`/stake/api/v1/pool/${id}`);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function txStake(body) {
  const { data } = await axios.post(`/stake/api/tx/stake`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchOrders(body) {
  const { data } = await axios.post(`/stake/api/v1/orders`, body);
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export async function fetchOrder(uuid) {
  const { data } = await axios.post(`/stake/api/v1/order/${uuid}`, {});
  if (data.code !== 200) throw Error(data.message);
  return data.data;
}

export * from './claim';

// import axios from 'axios';

// export async function fetchPools(body) {
//   // const { data } = await axios.post(`${config.stakeUrl}/api/v1/pools`, body);
//   const { data } = await axios.post(`/api/v1/pools`, body);
//   if (data.code !== 200) throw Error(data.message);
//   return data.data;
// }

// export async function fetchPoolDetail(id) {
//   // const { data } = await axios.post(`${config.stakeUrl}/api/v1/pool/${id}`);
//   const { data } = await axios.post(`/api/v1/pool/${id}`);
//   if (data.code !== 200) throw Error(data.message);
//   return data.data;
// }

// export async function txStake(body) {
//   const { data } = await axios.post(`/api/tx/stake`, body);
//   if (data.code !== 200) throw Error(data.message);
//   return data.data;
// }

// export async function fetchOrders(body) {
//   const { data } = await axios.post(`/api/v1/orders`, body);
//   if (data.code !== 200) throw Error(data.message);
//   return data.data;
// }

// export async function fetchOrder(uuid) {
//   const { data } = await axios.post(`/api/v1/order/${uuid}`, {});
//   if (data.code !== 200) throw Error(data.message);
//   return data.data;
// }

// export * from './claim';
