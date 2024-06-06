import { useEffect, useState } from 'react';
import LowSatsIcon from '@/assets/images/icon/profile/lowStas.svg?react';
import StandardSatsIcon from '@/assets/images/icon/profile/standardStas.svg?react';
import HighSatsIcon from '@/assets/images/icon/profile/highStas.svg?react';
import styles from './index.module.less';
import cn from 'classnames';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { CurrentSelectedRate } from '@/types';

type Props = {
  polling: boolean;
};

export const FeeRateSelector = ({ polling = true }: Props) => {
  const feeRate = useFeeRate(polling);

  const [rate, setRate] = useState<CurrentSelectedRate>(CurrentSelectedRate.halfHourFee);

  useEffect(() => {
    feeRate.getFee();

    return () => {
      feeRate.setCurrentSelectedRate(CurrentSelectedRate.halfHourFee);
    };
  }, []);

  return (
    <ul className={cn(styles['sats-select'], styles['etch'], 'd-flex justify-content-between')}>
      <li
        className={cn(styles['etch'], { [styles.select]: rate === CurrentSelectedRate.hourFee }, styles['sats-item'], 'd-flex flex-column justify-content-center align-items-center')}
        onClick={() => {
          setRate(CurrentSelectedRate.hourFee);
          feeRate.setCurrentSelectedRate(CurrentSelectedRate.hourFee);
        }}
      >
        <i className={styles.icon}>{<LowSatsIcon />}</i>
        <p className={cn(styles.des, 'fontSize-10 margin-bottom-3')}>{feeRate.lowFee} Sats/vB</p>
        <span className={cn(styles.level, 'fontSize-12')}>{'Low'}</span>
      </li>
      <li
        className={cn(styles['etch'], { [styles.select]: rate === CurrentSelectedRate.halfHourFee }, styles['sats-item'], 'd-flex flex-column justify-content-center align-items-center')}
        onClick={() => {
          setRate(CurrentSelectedRate.halfHourFee);
          feeRate.setCurrentSelectedRate(CurrentSelectedRate.halfHourFee);
        }}
      >
        <i className={styles.icon}>{<StandardSatsIcon />}</i>
        <p className={cn(styles.des, 'fontSize-10 margin-bottom-3')}>{feeRate.standardFee} Sats/vB</p>
        <span className={cn(styles.level, 'fontSize-12')}>{'Standard'}</span>
      </li>
      <li
        className={cn(styles['etch'], { [styles.select]: rate === CurrentSelectedRate.fastestFee }, styles['sats-item'], 'd-flex flex-column justify-content-center align-items-center')}
        onClick={() => {
          setRate(CurrentSelectedRate.fastestFee);
          feeRate.setCurrentSelectedRate(CurrentSelectedRate.fastestFee);
        }}
      >
        <i className={styles.icon}>{<HighSatsIcon />}</i>
        <p className={cn(styles.des, 'fontSize-10 margin-bottom-3')}>{feeRate.highFee} Sats/vB</p>
        <span className={cn(styles.level, 'fontSize-12')}>{'High'}</span>
      </li>
    </ul>
  );
};
