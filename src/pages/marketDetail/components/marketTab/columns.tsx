import { TProfileColumnItem } from '@/types/table';
import { get } from 'lodash';
import { PrimaryButton, StatusButton, UnitValue } from '@/components';

export const marketColumns: TProfileColumnItem = (fn) => [
  { headerName: 'Rune', field: 'rune', type: 'avatar' },
  { headerName: 'Amount', field: 'amount' },
  {
    headerName: 'Unit Price',
    field: 'unit',
    render: (record) => {
      return <UnitValue unitText={get(record, ['unit'])} valueText={get(record, ['price'])} />;
    },
  },
  {
    headerName: 'Total Price',
    field: 'total',
    render: (record) => {
      return <UnitValue unitText={get(record, ['total'])} valueText={get(record, ['value'])} />;
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    render: (record) => {
      const type = record['statusType'];
      return (
        <div className={'d-inline-flex  align-items-center'}>
          {type === 'status' ? (
            <StatusButton type={record['status'] === 'Confirming' ? record['status'] : 'Success'} text={record['status']} />
          ) : (
            <PrimaryButton
              onClick={() => {
                if (record['status'] === 'Buy') {
                  fn(record);
                }
              }}
              type={record['status'] === 'Buy' ? 'primary' : 'disabled'}
              text={record['status']}
            />
          )}
        </div>
      );
    },
  },
];
