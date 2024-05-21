import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { CommonTable } from '@/components';
import columns, { profileTabs, TProfileTabs } from './data/columns';
import styles from './index.module.less';
import { TransferModal, InsertTabs, CancelModal } from '@/components';
import { useSearchParams } from 'react-router-dom';
import useAddressList from '@/hooks/address/useAddressList.tsx';
import { TableSkeleton } from '@/components';
import EmptyPlaceholder from '@/components/layouts/emptyPlaceholder';

const ProfileTable: FC<{ address: string }> = ({ address }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setActiveTab((searchParams.get('tab') as TProfileTabs) || 'Assets');
  }, [searchParams]);
  const [activeTab, setActiveTab] = useState<TProfileTabs>();
  const [actionData, setActionData] = useState({ type: undefined, data: {} });
  const onTableAction = useCallback((type: string, data) => {
    setActionData({ type, data });
  }, []);
  const { loading, setParams, dataSource, params } = useAddressList(address, activeTab);
  const [insertActive, setInsertActive] = useState('buy');
  return (
    <div>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
        {profileTabs.map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>
      <EmptyPlaceholder text={'Market '} isEmpty={activeTab === 'Orders'}>
        <Fragment>
          {activeTab === 'Orders' && (
            <div className={styles['insert-tab']}>
              <InsertTabs
                onTabChange={setInsertActive}
                value={insertActive}
                items={[
                  { label: 'Buy', value: 'buy' },
                  { label: 'Sell', value: 'sell' },
                ]}
              />
            </div>
          )}
          <TableSkeleton loading={loading}>
            <CommonTable
              columns={columns?.(onTableAction, activeTab) || []}
              pagination={{
                count: dataSource.count,
                page: params.page,
                onChange: (_: React.ChangeEvent, page: number) => {
                  setParams((pre) => ({ ...pre, page }));
                },
              }}
              dataSource={dataSource.data}
            />
          </TableSkeleton>
        </Fragment>
      </EmptyPlaceholder>
      <CancelModal data={actionData.data} open={actionData.type === 'Cancel'} onClose={() => setActionData({ type: undefined, data: {} })} />
      {['Transfer', 'Sell'].includes(actionData.type) && <TransferModal modalType={actionData.type} data={actionData.data} open={['Transfer', 'Sell'].includes(actionData.type)} onClose={() => setActionData({ type: undefined, data: {} })} />}
    </div>
  );
};
export default ProfileTable;
