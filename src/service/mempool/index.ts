import config from '@/config';
import axios from 'axios';

export async function getFees() {
  try {
    const { data } = await axios.get(`${config.mempoolUrl}/api/v1/fees/recommended`);
    return data;
  } catch (error: any) {
    console.error(`Error in getFee: ${error}`);
    throw error;
  }
}

export async function pushTx(rawtx: any) {
  try {
    const { data } = await axios.post(`${config.mempoolUrl}/api/tx`, rawtx);
    return data;
  } catch (error: any) {
    console.error(`Error in getFee: ${error}`);
    throw error;
  }
}
