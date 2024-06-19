import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { CommonTable } from '@/components';
import columns, { profileTabs, TProfileTabs } from './data/columns';
import { TransferModal, CancelModal } from '@/components';
import { useSearchParams } from 'react-router-dom';
import useAddressList from '@/hooks/address/useAddressList.tsx';
import { TableSkeleton } from '@/components';
import EmptyPlaceholder from '@/components/layouts/emptyPlaceholder';
import styles from './index.module.less';
import BTCLockedTable from '@/pages/staking/components/btc-locked-table';
const ProfileTable: FC<{ address: string }> = ({ address }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setActiveTab((searchParams.get('tab') as TProfileTabs) || 'Claim');
  }, [searchParams]);
  const [activeTab, setActiveTab] = useState<TProfileTabs>();
  const [actionData, setActionData] = useState({ type: undefined, data: {} });
  const onTableAction = useCallback((type: string, data) => {
    setActionData({ type, data });
  }, []);
  const transferModal = ['Transfer', 'Sell', 'Claim'];
  const { loading, setParams, dataSource, params } = useAddressList(address, activeTab);
  return (
    <div>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
        {profileTabs.map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>
      <EmptyPlaceholder text={'Market '} isEmpty={false}>
        <Fragment>
          <TableSkeleton loading={loading}>
            {activeTab === 'Claim' ? (
              <BTCLockedTable />
            ) : (
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
            )}
          </TableSkeleton>
        </Fragment>
      </EmptyPlaceholder>
      <CancelModal data={actionData.data} open={actionData.type === 'Cancel'} onClose={() => setActionData({ type: undefined, data: {} })} />
      {transferModal.includes(actionData.type) && (
        <TransferModal
          title={actionData.type === 'Claim' ? 'Claim' : undefined}
          text={actionData.type === 'Claim' ? <p className={styles.text}>Due to the wallet has not yet adapted to the UTXO-Staking Protocol, the staked and rewarded assets are not visible yet. You need to claim to release them.</p> : undefined}
          modalType={actionData.type}
          data={actionData.data}
          open={transferModal.includes(actionData.type)}
          onClose={() => setActionData({ type: undefined, data: {} })}
        />
      )}
    </div>
  );
};
export default ProfileTable;
