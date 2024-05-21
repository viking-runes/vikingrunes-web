import { FC } from 'react';
import DownIcon from '@/assets/images/market/down.svg?react';

import UpIcon from '@/assets/images/market/up.svg?react';
const PriceChange: FC<{ text: string }> = ({ text }) => {
  const isUp = Math.random() * 10 > 5;
  return (
    <div className={'d-inline-flex gap-2 align-items-center fontSize-14'}>
      <span className={isUp ? 'primary-color' : 'danger-color'}>{text}</span>
      <i className={'d-flex align-items-center'}>{isUp ? <UpIcon /> : <DownIcon />}</i>
    </div>
  );
};
export default PriceChange;
