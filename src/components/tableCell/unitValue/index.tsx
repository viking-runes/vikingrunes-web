import { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.less';

import BtcLineIcon from '@/assets/images/icon/profile/btc-line.svg?react';
//import styles from '@/pages/profile/myAssets/components/profileTable/index.module.less';
interface IProps {
  showIcon?: boolean;
  unitText: string;
  valueText: string;
}
const UnitValue: FC<IProps> = (props) => {
  const { showIcon, unitText, valueText } = props;
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
        <p className={styles['table-value-text']}>${valueText}</p>
      </div>
    </div>
  );
};
export default UnitValue;
