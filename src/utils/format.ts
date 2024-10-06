import { IResponseStakeItem } from '@/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { secondFromNow } from '@/utils/stake';

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: number | string) => {
  if (!balance) return '';
  return +(+balance / 1e8).toFixed(8);
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

export const hexToBase64 = (hex: string) => {
  return bytesTobase64(hexTobytes(hex));
};

export const formatStakeDiffDays = (data: IResponseStakeItem) => {
  if (!data) return 0;

  const endDate = dayjs(data.ts_value * 1000);
  const beginDate = dayjs(Date.now());
  const diffInDays = endDate.diff(beginDate, 'day');
  return diffInDays > 0 ? diffInDays : 0;
};

const getEndDate = (data: IResponseStakeItem) => {
  if (!data) return dayjs(0);

  switch (data.ts_value_type) {
    case 'incr':
      return dayjs((secondFromNow() + data.ts_value) * 1000);

    default:
      return dayjs(data.ts_value);
  }
};

export const formatStakeDiffHours = (data: IResponseStakeItem) => {
  if (!data) return 0;

  const endDate = getEndDate(data);
  const beginDate = dayjs(Date.now());
  const diffInHours = endDate.diff(beginDate, 'hour');
  return diffInHours > 0 ? diffInHours : 0;
};

export const formatStakeLockedTime = (time: any) => {
  if (!time) return '';

  dayjs.extend(utc);
  return dayjs.utc(time * 1000).format('YYYY-MM-DD HH:mm:ss');
};

export const formatStakeCountDown = (time: number) => {
  if (!time) return '';

  dayjs.extend(duration);

  const diff = time * 1000 - Date.now();
  if (diff < 0) return '00:00:00';

  const durationFromNow = dayjs.duration(diff);
  const days = durationFromNow.days();

  return `${days} Day ${durationFromNow.hours()}:${durationFromNow.minutes()}:${durationFromNow.seconds()}`;
};

export const isLockedTimeExpired = (time: any) => {
  const diff = time * 1000 - Date.now();
  return diff < 0;
};
