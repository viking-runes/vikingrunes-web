import { IResponseStakeItem } from '@/types';
import dayjs from 'dayjs';

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: number | string) => {
  if (!balance) return '';
  return (+balance / 1e8).toFixed(8);
};

export function base64ToHex(str: string) {
  return atob(str)
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export function bytesTobase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

export const bytesToHex = (bytes) => Buffer.from(bytes).toString('hex');

export const hexTobytes = (hex) => Buffer.from(hex, 'hex');

export const formatStakeDiffDays = (data: IResponseStakeItem) => {
  if (!data) return 0;
  const endDate = dayjs(data.end_date);
  const beginDate = dayjs(data.begin_date);
  const diffInDays = endDate.diff(beginDate, 'day');
  return diffInDays;
};
