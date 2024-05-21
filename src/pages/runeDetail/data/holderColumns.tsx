import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components/commonTable';
import TransactionsCode from '@/components/transactionsCode';

const holderColumns: Array<GridColDef & IDataRow> = [
  { headerName: 'Rank', field: 'index', align: 'center' },
  {
    headerName: 'Address',
    field: 'address',
    align: 'center',
    render: (row: IHolderItem) => <TransactionsCode type={'address'} code={row.address} len={4} />,
  },
  {
    headerName: 'Percentage',
    field: 'percentage',
    align: 'center',
    dataFormat: (text: string) => {
      return !isNaN(Number(text)) ? Number(text) / 100 : undefined;
    },
    type: 'progress',
    hideable: true,
  },
  { headerName: 'Amount', field: 'format_amount', type: 'comma', align: 'center' },
];
export default holderColumns;
