import { FC, useState } from 'react';
import styles from './index.module.less';
import ContentHeader from '@/components/contentHeader';
import SmTitle from '@/pages/addressDetail/components/smTitle';
import { Tab, Tabs } from '@mui/material';
import { TableSkeleton, CommonTable } from '@/components';
import { useParams } from 'react-router-dom';
import balancesColumn from './data/balancesColumn.tsx';
import mintsColumn from './data/mintsColumn.tsx';
import useAddressList from '@/hooks/address/useAddressList.tsx';
const items = [
  { key: 'balances', label: 'Balances' },
  { key: 'transfers', label: 'Transfers' },
  { key: 'mints', label: 'Mints' },
];
const AddressDetail: FC = () => {
  const [tab, setTab] = useState('balances');
  const onTabChange = (_: React.SyntheticEvent, value: string) => {
    if (loading) return;
    setTab(value);
  };
  const { id } = useParams();
  const { dataSource, setParams, loading, params } = useAddressList(id, tab);

  return (
    <div className={styles.page}>
      <ContentHeader copyText={[id]} headArr={['Address']} />
      <SmTitle title={'Activity'} />
      <div className={styles.card}>
        <Tabs value={tab} onChange={onTabChange} aria-label="wrapped label tabs example">
          {items.map((item) => {
            return <Tab disableRipple value={item.key} key={item.key} label={<span>{item.label}</span>} />;
          })}
        </Tabs>
        <div>
          <TableSkeleton loading={loading}>
            <CommonTable
              columns={tab === 'balances' ? balancesColumn : mintsColumn}
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
export default AddressDetail;
