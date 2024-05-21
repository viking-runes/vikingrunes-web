import { GridColDef } from '@mui/x-data-grid';
import { IDataRow, UnitValue } from '@/components';
import { get } from 'lodash';

export const activityColumns: Array<GridColDef & IDataRow> = [
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
  { headerName: 'Seller', field: 'seller', type: 'copy' },
  { headerName: 'Buyer', field: 'buyer', type: 'copy' },
  { headerName: 'Time', field: 'time', type: 'timestamp' },
];
