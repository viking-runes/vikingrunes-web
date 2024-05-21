import { FC } from 'react';
import TransactionsCode from '@/components/transactionsCode';
import styles from './index.module.less';
import cn from 'classnames';
import CopyIcon from '@/components/copyIcon';

const SmCopyText: FC<{ code: string; type?: 'address' }> = ({ code, type }) => {
  return (
    <p className={cn(styles.copy, 'd-flex justify-content-center align-items-center')}>
      <TransactionsCode code={code} len={4} type={type} />
      <CopyIcon code={code} />
    </p>
  );
};
export default SmCopyText;
