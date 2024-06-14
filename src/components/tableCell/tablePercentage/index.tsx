import { FC, useMemo } from 'react';
import styles from './index.module.less';
import { Tooltip } from '@mui/material';
import cn from 'classnames';
import { fixedNumber, onFormat, onFormatNumber } from '@/utils';
import { Decimal } from 'decimal.js';

const TablePercentage: FC<IRuneData> = (props) => {
  const percentage = useMemo(() => {
    if (props?.progress?.cap_times.includes('No')) {
      return {
        all: 100,
        fairmint: 0,
        premine: 100,
      };
    }
    const cap = new Decimal(props?.terms.amount).mul(new Decimal(props?.progress?.cap_times));
    const premine = new Decimal(onFormatNumber(props?.premine, props.divisibility)).dividedBy(cap).mul(100);
    const fairmint = new Decimal(props?.mints).dividedBy(cap).mul(100);
    const preminePercentage = props?.viking_format.premine_percentage 
    const fairMintPercentage = props?.viking_format.fairmint_percentage
    const isOver = (preminePercentage+fairMintPercentage)>=100
    return {
      cap: cap.toFixed(),
      premine: isOver ? 100 : fixedNumber(premine.toFixed(2), 2),
      all: isOver ? 100 : fixedNumber(premine.add(fairmint).toFixed(2), 2),
      fairmint: isOver ? 0 : fixedNumber(fairmint.toFixed(2), 2),
      preminePercentage:preminePercentage>0?(preminePercentage/100).toFixed(2):0,
      fairMintPercentage:(fairMintPercentage/100).toFixed(2),
      allPercentage: ((preminePercentage+fairMintPercentage)/100).toFixed(2),
      blockLeft:props?.viking_format.block_left, 
    };
  }, [props]);
  return (
    <Tooltip
      placement={'top'}
      classes={{ popper: styles['tooltip'] }}
      title={
        <div className={cn('d-flex flex-column gap-7 fontSize-12', styles['percentage-tooltip'])}>
          {percentage.blockLeft > 0 ? (
            <p className={'d-flex flex-column gap-3'}>
              <a>{onFormat(props?.progress?.blocks_left)}</a>
              <span>Blocks left</span>
            </p>
          ) : (
            <p className={'d-flex flex-column gap-3'}>
              <span>Total supply</span>
              <a>{props?.viking_format.total_supply}</a>
            </p>
          )}
          <p className={'d-flex flex-column gap-3'}>
            <span>Current supply</span>
            <a>{props?.viking_format.current_supply}</a>
          </p>
          <p className={'d-flex flex-column gap-3'}>
            <span>Premine</span>
            <a>{percentage.preminePercentage}%</a>
          </p>
        </div>
      }
    >
      <p style={{ ['--percentage-all']: `${percentage.allPercentage}%`, ['--percentage-fairmint']: `${percentage.fairMintPercentage}%` }} className={cn(styles['percentage-bg'], 'd-flex align-items-center gap-5')}>
        <span className={cn(styles['percentage-bar'])} />
        <a className={styles['percentage-value']}>{percentage.allPercentage}%</a>
      </p>
    </Tooltip>
  );
};
export default TablePercentage;
