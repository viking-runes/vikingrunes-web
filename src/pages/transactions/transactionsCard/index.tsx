import { FC } from 'react';
import Grid from '@mui/material/Grid';
import TransactionsCode from '@/components/transactionsCode';
import ArrowRightLogo from '@/assets/images/icon/arrowRight.svg?react';
import cn from 'classnames';
import CashCard from './components/cashCard';
import styles from './index.module.less';
import { Skeleton } from '@mui/material';
import { isEmpty } from 'lodash';

interface IProps {
  inputItems: ITransactionInput[];
  outputItems: ITransactionInput[];
}
const TransactionsCard: FC<IProps> = ({ inputItems, outputItems }) => {
  return (
    <div className={cn(styles['info-card-com'], styles['transactions-card'])}>
      <Grid container spacing={2} className={styles.container}>
        {[inputItems, outputItems].map((items, index) => {
          return (
            <Grid item lg={6} md={6} sm={12} xs={12} key={index + index} className={styles.grid}>
              {!items ? (
                <Skeleton height={40} animation={'wave'} />
              ) : (
                <div className={cn(styles['transaction-card-wrapper'], 'd-flex flex-column')}>
                  {items.map((item, idx) => {
                    return (
                      <div key={idx + idx} className={cn(styles['transaction-card'], 'fontSize-16 d-flex justify-content-between', { input: index === 0 })}>
                        <i className={styles['go-to-detail']}>
                          <ArrowRightLogo />
                        </i>
                        <div className={cn(styles['transaction-card-right'], 'd-flex flex-column', { [styles['mobile']]: item?.balances?.length })}>
                          <div className={cn(styles['transaction-info'], 'd-flex justify-content-between')}>
                            {!isEmpty(item.address) ? <TransactionsCode type={'address'} code={item.address} /> : 'OP_RETURN'}
                            {!isEmpty(item.address) && <p>{item.btc}</p>}
                          </div>
                          <div className={cn(styles['cash-wrapper'], 'd-flex flex-wrap')}>{item?.balances?.map((blance) => <CashCard key={blance.div_amount} value={`${blance.rune} ${blance.div_amount}`} />)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default TransactionsCard;
