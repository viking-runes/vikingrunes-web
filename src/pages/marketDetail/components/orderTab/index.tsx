import { FC, useCallback, useState } from 'react';
import styles from '@/pages/profile/myAssets/components/profileTable/index.module.less';
import { CancelModal, CommonTable, InsertTabs } from '@/components';
import { buyColumns, sellColumns } from '@/pages/marketDetail/components/orderTab/columns.tsx';
import { buyMockData } from '@/pages/marketDetail/components/orderTab/buyMockData.ts';
import { sellMock } from '@/pages/marketDetail/components/orderTab/sellMockData.ts';

const OrderTab: FC = () => {
  const [insertActive, setInsertActive] = useState('buy');
  const onCancel = useCallback(() => {
    setActionData({ type: 'Cancel', data: {} });
  }, []);
  const [actionData, setActionData] = useState({ type: undefined, data: {} });
  return (
    <div>
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
      <CommonTable columns={insertActive === 'buy' ? buyColumns : sellColumns(onCancel)} dataSource={insertActive === 'buy' ? buyMockData : sellMock} />
      <CancelModal data={actionData.data} open={actionData.type === 'Cancel'} onClose={() => setActionData({ type: undefined, data: {} })} />
    </div>
  );
};
export default OrderTab;
