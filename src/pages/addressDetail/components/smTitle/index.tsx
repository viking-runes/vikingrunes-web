import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import HeadIcon from '@/assets/images/icon/headIcon.svg?react';
const SmTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.title}>
      <p className={cn(styles.head, 'd-flex align-items-center')}>
        <i>
          <HeadIcon />
        </i>
        <span>{title}</span>
      </p>
    </div>
  );
};
export default SmTitle;
