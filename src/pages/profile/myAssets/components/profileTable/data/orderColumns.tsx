import UnitValue from '@/components/tableCell/unitValue';
import { get } from 'lodash';
import { StatusButton, PrimaryButton } from '@/components';
import { STATUS_BTN_MAP } from '@/utils/contant.ts';
import { TProfileColumnItem } from '@/types/table';

export const orderColumns: TProfileColumnItem = (fn) => [
  { headerName: 'Rune', field: 'rune', type: 'avatar' },
  { headerName: 'Amount', field: 'amount' },
  {
    headerName: 'Unit Price',
    field: 'unitPrice',
    render: (record) => {
      return <UnitValue unitText={get(record, ['unit'])} valueText={get(record, ['price'])} />;
    },
  },
  {
    headerName: 'Total Value',
    field: 'totalValue',
    render: (record) => {
      return <UnitValue unitText={get(record, ['total'])} valueText={get(record, ['value'])} />;
    },
  },
  { headerName: 'Time', field: 'time', type: 'timestamp' },
  {
    headerName: 'Status',
    field: 'status',
    render: (record) => {
      return (
        <div className={'d-inline-flex width-4rem text-align-left align-items-center'}>
          {record['status'] === 'Cancel' ? <PrimaryButton type={'primary'} onClick={fn.bind(null, 'Cancel')} text={record['status']} /> : <StatusButton type={STATUS_BTN_MAP[record['status']]} text={record['status']} />}
        </div>
      );
    },
  },
];
