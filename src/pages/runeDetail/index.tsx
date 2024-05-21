import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import { detailData, transactionColumns, holderColumns } from './data/index.ts';
import { useParams } from 'react-router-dom';
import { useRuneDetail } from './hooks/useRuneDetail.tsx';
import RuneItemInfo from './components/runeItemInfo';
import { CommonTable, ContentHeader, InfoCard, TableSkeleton } from '@/components';
import { get } from 'lodash';
import { fetchTransferList } from '@/service/common/transferList.ts';
import { fetchHolderList } from '@/service/runeDetail/holderList.ts';
const RuneDetail: FC = () => {
  const { id } = useParams();
  const [runeDetail] = useRuneDetail(id);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ data: [], count: 0 });
  const [params, setParams] = useState({ tabActive: 'Holders', page: 1 });
  const requestHolderList = async () => {
    const isHolder = params.tabActive === 'Holders';
    setLoading(true);
    const res = isHolder ? await fetchHolderList<{ accounts: IHolderList }>(params.page, id) : await fetchTransferList<{ runetxs: ITransactionData }>(params.page, { rune_id: id });
    setLoading(false);
    const count = get(res, [isHolder ? 'accounts' : 'runetxs', 'pagination', 'page_total']);
    const dataSource = get(res, [isHolder ? 'accounts' : 'runetxs', 'items']);
    setDataSource({ data: dataSource, count });
  };
  useEffect(() => {
    void requestHolderList();
  }, [params]);
  return (
    <div className={styles.page}>
      <ContentHeader isSmHead={true} textArr={['Real Time Data Tracking']} headArr={['THE', 'UNIVERSAL', 'zoroday#', 'zorosmallVIKINGRUNES', 'EXPLORER', '&', 'SERVICES']} />
      <RuneItemInfo dataSource={runeDetail} />
      <p className={styles.divider} />
      <InfoCard mobileIndex={2} dataSource={runeDetail} item={detailData} lg={4} />
      <div className={styles.table}>
        <div className={styles['table-card']}>
          <div className={cn(styles.tabs, 'd-flex')}>
            {['Holders', 'Transfers'].map((tab) => (
              <p
                key={tab}
                className={cn({ [styles.active]: params.tabActive === tab }, styles.btn)}
                onClick={() => {
                  if (loading) return;
                  setParams((pre) => ({ ...pre, page: 1, tabActive: tab }));
                }}
              >
                <a>{tab}</a>
              </p>
            ))}
          </div>
          <TableSkeleton loading={loading}>
            <CommonTable
              columns={params.tabActive === 'Holders' ? holderColumns : transactionColumns}
              dataSource={dataSource.data}
              pagination={{
                count: dataSource.count,
                page: params.page,
                onChange: (_: React.ChangeEvent, page: number) => {
                  setParams((pre) => ({ ...pre, page }));
                },
              }}
            />
          </TableSkeleton>
        </div>
      </div>
    </div>
  );
};
export default RuneDetail;
