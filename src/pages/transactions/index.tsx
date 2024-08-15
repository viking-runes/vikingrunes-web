import { FC } from 'react';
import TransactionsCard from '@/pages/transactions/transactionsCard';
import { ContentHeader, InfoCard } from '@/components';
import styles from './index.module.less';
import { useParams } from 'react-router-dom';
import { useTransaction } from './hooks/useTransaction.tsx';
import { infoColumn } from '@/pages/transactions/data/infoColumn.tsx';
import { Box, Chip, Typography } from '@mui/material';

const Transactions: FC = () => {
  const { id } = useParams();
  const [dataSource] = useTransaction(id);

  const stake = dataSource?.stake_data;
  const claim = dataSource?.claim_data;

  return (
    <div className={styles['transactions-all-page']}>
      <ContentHeader
        copyText={[id]}
        headArr={['Transactions']}
        additionalHeader={
          <Box>
            {stake && <Chip label={<Typography variant="body2">Stake</Typography>} variant="outlined" size="small" />}
            {claim?.is_claim && <Chip label={<Typography variant="body2">Claim</Typography>} variant="outlined" size="small" />}
          </Box>
        }
      />
      <InfoCard mobileIndex={1} item={infoColumn} dataSource={dataSource} />
      <ContentHeader headArr={['Inputs & Outputs']} />
      <TransactionsCard inputItems={dataSource?.vin} outputItems={dataSource?.vout} />
    </div>
  );
};
export default Transactions;
