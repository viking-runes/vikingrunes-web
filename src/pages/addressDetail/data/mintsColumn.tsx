import { get } from 'lodash';
import { CommonButton } from '@/components';
import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components/commonTable';
import { BUTTON_MAP } from '@/utils/contant.ts';

const mintsColumn: Array<GridColDef & IDataRow> = [
  { headerName: 'Rune', field: 'rune' },
  {
    headerName: 'Action',
    field: 'action',
    hideable: true,
    render: (record) => {
      const typeText = (get(record, 'action') || '')?.toLowerCase();

      return <CommonButton type={get(BUTTON_MAP, [typeText])} text={typeText} />;
    },
  },
  { headerName: 'Amount', field: 'format_amount', type: 'comma' },
  { headerName: 'From', field: 'from_address', type: 'copy', hideable: true },
  { headerName: 'To', field: 'to_address', type: 'copy', hideable: true },
  { headerName: 'Date', field: 'block_time', type: 'timestamp', hideable: true },
];
export default mintsColumn;
