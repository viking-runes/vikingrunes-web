import { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.less';

import BtcLineIcon from '@/assets/images/icon/profile/btc-line.svg?react';
interface IProps {
  showIcon?: boolean;
  unitText: string;
  valueText: string;
  type?: 'default' | 'no-style';
}
const UnitValue: FC<IProps> = (props) => {
  const { showIcon, unitText, valueText, type } = props;
  return (
    <div className={'d-flex justify-content-center align-items-center'}>
      <div className={cn(styles['table-value'], 'gap-7 d-flex flex-column justify-content-start')}>
        <p className={'d-flex align-items-center gap-2'}>
          {showIcon && (
            <i className={styles['table-icon']}>
              <BtcLineIcon />
            </i>
          )}
          <span>{unitText}</span>
        </p>
        <p className={cn(styles['table-value-text'], styles[type])}>
          {type === 'no-style' ? '' : '$'}
          {valueText}
        </p>
      </div>
    </div>
  );
};
export default UnitValue;
