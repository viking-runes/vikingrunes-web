import UnitValue from '@/components/tableCell/unitValue';
import { PrimaryButton } from '@/components';
import { TProfileColumnItem } from '@/types/table';
export const mockTableData = [
  {
    lockedAssets: 'ASDFGHJKLNB',
    amount: '999,999',
    lockedTime: '02:50 05-28-2024',
    reward: 'ASDFG 999,999',
    countdown: '3 Day 23:34:59',
    utxo: 'Click',
    action: 'Claim',
  },
  {
    lockedAssets: 'ASDFGHJKLNB',
    amount: '999,999',
    lockedTime: '02:50 05-28-2024',
    reward: 'ASDFG 999,999',
    countdown: '3 Day 23:34:59',
    utxo: 'Click',
    action: 'Claim',
  },
  {
    lockedAssets: 'ASDFGHJKLNB',
    amount: '999,999',
    lockedTime: '02:50 05-28-2024',
    reward: 'ASDFG 999,999',
    countdown: '3 Day 23:34:59',
    utxo: 'Click',
    action: 'Claim',
  },
  {
    lockedAssets: 'ASDFGHJKLNB',
    amount: '999,999',
    lockedTime: '02:50 05-28-2024',
    reward: 'ASDFG 999,999',
    countdown: '3 Day 23:34:59',
    utxo: 'Click',
    action: 'Claim',
  },
  {
    lockedAssets: 'ASDFGHJKLNB',
    amount: '999,999',
    lockedTime: '02:50 05-28-2024',
    reward: 'ASDFG 999,999',
    countdown: '3 Day 23:34:59',
    utxo: 'Click',
    action: 'Claim',
  },
];

export const claimColumns: TProfileColumnItem = (fn) => [
  { headerName: 'Locked assets', field: 'lockedAssets' },
  { headerName: 'Amount', field: 'amount' },
  { headerName: 'Locked time', field: 'lockedTime' },
  {
    headerName: 'Reward',
    field: 'reward',
    render: () => {
      return <UnitValue type={'no-style'} unitText={'ASDFG'} valueText={'999,999'} />;
    },
  },
  { headerName: 'Countdown', field: 'countdown' },
  {
    headerName: 'UTXO',
    field: 'utxo',
    render: () => {
      return (
        <div className={'d-inline-flex width-4rem text-align-left align-items-center'}>
          <PrimaryButton type={'default'} onClick={fn.bind(null, 'Click')} text={'Click'} />
        </div>
      );
    },
  },
  {
    headerName: 'Action',
    field: 'action',
    render: (record) => {
      return (
        <div className={'d-inline-flex width-4rem text-align-left align-items-center'}>
          <PrimaryButton type={'primary'} onClick={fn.bind(null, 'Claim', record)} text={'Claim'} />
        </div>
      );
    },
  },
];
