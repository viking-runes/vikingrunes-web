import commaNumber from 'comma-number';
import BigInt from 'big-integer';
import { Decimal } from 'decimal.js';
export const fixedNumber = (num: string | number | Decimal, precision?: number) => {
  const d = new Decimal(num);
  return d.decimalPlaces() > (precision || 4) ? d.toFixed(precision || 4) : d.toString();
};
export const parseParams = (props?: Record<string, string>) => {
  const hasValue = Object.entries(props).filter(([, value]) => Boolean(value));
  return hasValue.length === 0
    ? ''
    : `
      where:{
        ${hasValue.map(([key, value]) => `${key}:"${value}"`)}
      }
    `;
};
export const createThumbnail = async (ele: HTMLInputElement) => {
  return new Promise<string | ArrayBuffer>((resolve) => {
    const [file] = ele.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
  });
};
const isValid = (num: string | number) => {
  return num && !new RegExp('[A-Za-z.]').test(num?.toString());
};
export const onFormat = (num: string | number) => {
  if (isValid(num)) {
    const number = num?.toString()?.split(',')?.join('');
    return BigInt(number).compareTo(1000000000) > 0 ? `${commaNumber(BigInt(number).divide(1000000).toString())}m` : commaNumber(number);
  }
  return num;
};
export const onFormatNumber = (s, div) => {
  if (div > 0) {
    if (!isValid(s) || new Decimal(s)?.isNaN()) {
      return s;
    }
    return new Decimal(s).dividedBy(Decimal.pow(10, div))?.toFixed();
  }
  return s;
};
