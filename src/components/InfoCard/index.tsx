import React, { FC, Fragment } from 'react';
import styles from './index.module.less';
import Grid from '@mui/material/Grid';
import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get } from 'lodash';
import TransactionsCode from '@/components/transactionsCode';
import { Skeleton } from '@mui/material';
import { onFormat } from '@/utils';
dayjs.extend(relativeTime);
export interface IInfoCardDataItem {
  render?: (data: IRuneDetailItem) => React.ReactNode;
  title: string;
  field?: Array<string> | string;
  type?: 'timestamp' | 'code' | 'date' | 'txs-code' | 'comma';
}
interface IProps {
  item: Array<Array<IInfoCardDataItem>>;
  dataSource?: IRuneDetailItem;
  lg?: number;
  mobileIndex?: number;
}
const InfoCard: FC<IProps> = ({ item, mobileIndex, lg, dataSource }) => {
  return (
    <div className={cn(styles['info-card-com'])}>
      <Grid container spacing={2} className={styles.container}>
        {item.map((des, index) => {
          return (
            <Fragment key={index + index}>
              <Grid className={styles.grid} item lg={lg || 6} md={lg || 6} sm={12} xs={12}>
                <ul className={cn(styles.card, 'd-flex flex-column', { [styles['mobile']]: mobileIndex === index })}>
                  {des.map((text) => {
                    const value = get(dataSource, text?.field);
                    const date = dayjs(Number(`${value}000`)).format('YYYY-MM-DD HH:mm');
                    return (
                      <Fragment key={text.title}>
                        {!dataSource ? (
                          <Skeleton />
                        ) : (
                          <li className={cn(styles.line, 'd-flex flex-column')}>
                            <p className={styles.title}>{text.title}</p>
                            <p className={cn(styles.info, 'd-flex align-items-center')}>
                              {text?.render ? (
                                text.render(dataSource)
                              ) : (
                                <>
                                  {text.type === 'comma' && onFormat(value)}
                                  {text.type === 'date' && `${date}`}
                                  {text.type === 'txs-code' && <TransactionsCode type={text.type} code={value} />}
                                  {text.type === 'timestamp' && `${date}(${dayjs(Number(`${value}000`)).fromNow()})`}
                                  {!text.type && value}
                                </>
                              )}
                            </p>
                          </li>
                        )}
                      </Fragment>
                    );
                  })}
                </ul>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </div>
  );
};
export default InfoCard;
