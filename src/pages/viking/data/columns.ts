import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components';

export const vikingColumns: Array<GridColDef & IDataRow> = [
  { headerName: '#', field: 'index', hideable: true },
  { headerName: 'Address', field: 'address', type: 'copy' },
  { headerName: 'Balance', field: 'balance' },
  { headerName: 'Locked', field: 'locked' },
  { headerName: 'Percentage', field: 'percentage' },
];
