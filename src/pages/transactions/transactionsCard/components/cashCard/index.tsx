import { FC } from 'react';

import ArrowSmallRight from '@/assets/images/icon/arrowSmallRight.svg?react';
import PieChart from '@/assets/images/icon/pieChart.svg?react';
import styles from './index.module.less';
import cn from 'classnames';
interface IProps {
  value: string;
}
const CashCard: FC<IProps> = ({ value }) => {
  return (
    <div className={'d-flex'}>
      <div className={cn(styles.card, 'd-flex align-items-center')}>
        <i className={styles.icon}>
          <ArrowSmallRight />
        </i>
        <span>{value}</span>
        <i className={styles.icon}>
          <PieChart />
        </i>
      </div>
    </div>
  );
};
export default CashCard;
