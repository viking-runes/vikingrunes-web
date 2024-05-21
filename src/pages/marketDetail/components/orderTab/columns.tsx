import { GridColDef } from '@mui/x-data-grid';
import { IDataRow, PrimaryButton, StatusButton, UnitValue } from '@/components';
import { get } from 'lodash';
import { TProfileColumnItem } from '@/types/table';
import { STATUS_BTN_MAP } from '@/utils/contant.ts';
const commonColumns: Array<GridColDef & IDataRow> = [
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
  { headerName: 'Time', field: 'time', type: 'timestamp' },
];
export const buyColumns: Array<GridColDef & IDataRow> = [
  ...commonColumns,
  {
    field: 'action',
    headerName: 'Action',
    render: (record) => {
      return (
        <div className={'d-inline-flex  align-items-center'}>
          <StatusButton type={record['status'] === 'Confirming' ? record['status'] : 'Success'} text={record['status']} />
        </div>
      );
    },
  },
];
export const sellColumns: TProfileColumnItem = (fn) => [
  ...commonColumns,
  {
    field: 'action',
    headerName: 'Action',
    render: (record) => {
      return (
        <div className={'d-inline-flex width-4rem text-align-left align-items-center'}>
          {record['status'] === 'Cancel' ? <PrimaryButton type={'primary'} onClick={fn.bind(null, 'Cancel')} text={record['status']} /> : <StatusButton type={STATUS_BTN_MAP[record['status']]} text={record['status']} />}
        </div>
      );
    },
  },
];
