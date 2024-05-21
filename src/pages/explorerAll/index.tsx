import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.less';
import { Tab, Tabs } from '@mui/material';
import columns from '@/pages/explorerAll/columns.tsx';
import { useNavigate } from 'react-router-dom';
import { fetchExplorerAllData } from '@/service/explorerAll';
import { CommonTable, ContentHeader, TableSkeleton } from '@/components';
import SearchInput from '@/pages/explorerAll/comonents/searchInput';

const ExplorerAll: FC = () => {
  const items = [
    { key: 'all', label: 'All' },
    { key: 'mint', label: 'Mint Now' },
  ];

  const [dataSource, setDataSource] = useState<IRuneDataResponse['items']>([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ count: 0, page: 1 });
  const [params, setParams] = useState({ tab: 'all', holder: true, all_in_search: '' });
  const [loading, setLoading] = useState(false);
  const requestExplorerAll = async (requestParams: { page: number; tab?: string; all_in_search: string }) => {
    setLoading(true);
    const { runes } = await fetchExplorerAllData<{ runes: IRuneDataResponse }>(requestParams, params.holder);
    setLoading(false);
    setDataSource(runes?.items);
    setPagination({ count: runes?.pagination?.page_total, page: pagination.page });
  };
  useEffect(() => {
    void requestExplorerAll(Object.assign({ page: pagination.page, all_in_search: params.all_in_search, tab: params.tab }));
  }, [params, pagination?.page]);
  return (
    <div className={styles['exploer-all-page']}>
      <ContentHeader isSmHead={true} textArr={['Real Time Data Tracking']} headArr={['THE', 'UNIVERSAL', 'zoroday#', 'zorosmallVIKINGRUNES', 'EXPLORER', '&', 'SERVICES']} />
      <div className={styles.card}>
        <div className={styles['tabs-wrapper']}>
          <Tabs
            value={params.tab}
            onChange={(_, value) => {
              setParams((pre) => ({ ...pre, tab: value }));
              setPagination((pre) => ({ ...pre, page: 1 }));
            }}
            aria-label="wrapped label tabs example"
          >
            {items.map((item) => (
              <Tab value={item.key} key={item.key} label={item.label} />
            ))}
          </Tabs>
        </div>
        <SearchInput />
        <div className={styles.table}>
          <TableSkeleton loading={loading}>
            <CommonTable
              onHeadClick={(item) => {
                if (item.columnType !== 'sort') return;
                setParams((pre) => ({ ...pre, holder: !pre.holder }));
                setPagination((pre) => ({ ...pre, page: 1 }));
              }}
              pagination={{
                onChange: (_: React.ChangeEvent, page) => {
                  if (page !== pagination.page) {
                    setPagination((pre) => ({ ...pre, page }));
                  }
                },
                page: pagination.page,
                count: pagination?.count,
              }}
              columns={columns((id: string) => {
                navigate({ pathname: `/rune/${id}` });
              }).filter((item) => params.tab !== 'mint' || item.field !== 'symbol')}
              dataSource={dataSource}
            />
          </TableSkeleton>
        </div>
      </div>
    </div>
  );
};
export default ExplorerAll;
