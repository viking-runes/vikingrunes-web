import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components/commonTable';
import { onFormat, onFormatNumber } from '@/utils';

const balancesColumn: Array<GridColDef & IDataRow> = [
  { headerName: 'Rune', field: 'rune' },
  { headerName: 'Symbol', field: 'symbol', hideable: true },
  {
    headerName: 'Balance',
    field: 'balance',
    render: (record: IRuneDetailItem) => {
      return onFormat(onFormatNumber(record?.balance, record?.divisibility));
    },
  },
];
export default balancesColumn;
