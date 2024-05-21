import { FC, useCallback, useState } from 'react';
import { CommonTable } from '@/components';
import { marketColumns } from './columns.tsx';
import { marketMockdata } from './mockdata.ts';
import { TransferModal } from '@/components';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate.ts';

const MarketTab: FC = () => {
  const [actionData, setActionData] = useState({ type: undefined, data: {} });
  const onBuy = useCallback((data) => {
    console.log(data);
    setActionData({ type: 'Transfer', data });
  }, []);

  useFeeRate(false);

  return (
    <div>
      <CommonTable dataSource={marketMockdata} columns={marketColumns(onBuy)} />
      <TransferModal modalType={actionData.type} title={'Buy'} data={actionData.data} open={actionData.type === 'Transfer'} onClose={() => setActionData({ type: undefined, data: {} })} />
    </div>
  );
};
export default MarketTab;
