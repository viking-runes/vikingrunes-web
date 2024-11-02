import config from '@/config';
import axiosInstance from '@/utils/axios';

export async function getBalance(address: string): Promise<any> {
  try {
    // throw new Error('Not implemented');

    const { data } = await axiosInstance.get(`${config.openDaoHost}/v1/address/${address}/balance`);
    const balance = data.data;

    return {
      confirmed: +balance.confirmed.amount,
      unconfirmed: +balance.pending.amount,
      total: +balance.confirmed.amount + +balance.pending.amount,
    };
  } catch (error: any) {
    console.error(`Error in getbalance: ${error}`);
    throw error;
  }
}

export async function mint(body: any): Promise<any> {
  try {
    const { data } = await axiosInstance.post(`${config.openDaoHost}/v1/rune/mint`, body);

    return data.data;
  } catch (error: any) {
    console.error(`Error in mint: ${error}`);
    throw error;
  }
}

export async function transfer(body: any): Promise<any> {
  try {
    const { data } = await axiosInstance.post(`${config.openDaoHost}/v1/rune/transfer`, body);

    return data.data;
  } catch (error: any) {
    console.error(`Error in transfer: ${error}`);
    throw error;
  }
}
