import { FC } from 'react';
import TransactionsCard from '@/pages/transactions/transactionsCard';
import { ContentHeader, InfoCard } from '@/components';
import styles from './index.module.less';
import { useParams } from 'react-router-dom';
import { useTransaction } from './hooks/useTransaction.tsx';
import { infoColumn } from '@/pages/transactions/data/infoColumn.tsx';

const Transactions: FC = () => {
  const { id } = useParams();
  const [dataSource] = useTransaction(id);
  return (
    <div className={styles['transactions-all-page']}>
      <ContentHeader copyText={[id]} headArr={['Transactions']} />
      <InfoCard mobileIndex={1} item={infoColumn} dataSource={dataSource} />
      <ContentHeader headArr={['Inputs & Outputs']} />
      <TransactionsCard inputItems={dataSource?.vin} outputItems={dataSource?.vout} />
    </div>
  );
};
export default Transactions;
