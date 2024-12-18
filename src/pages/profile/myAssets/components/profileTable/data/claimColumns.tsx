import UnitValue from '@/components/tableCell/unitValue';
import { PrimaryButton } from '@/components';
import { TProfileColumnItem } from '@/types/table';

export const claimColumns: TProfileColumnItem = (fn) => [
  { headerName: 'Locked assets', field: 'lockedAssets' },
  { headerName: 'Amount', field: 'amount', hideable: true },
  { headerName: 'Locked time', field: 'lockedTime', hideable: true },
  {
    headerName: 'Reward',
    field: 'reward',
    hideable: true,
    render: () => {
      return <UnitValue type={'no-style'} unitText={'ASDFG'} valueText={'999,999'} />;
    },
  },
  { headerName: 'Countdown', field: 'countdown', hideable: true },
  {
    headerName: 'UTXO',
    field: 'utxo',
    hideable: true,
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
