import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components/commonTable';
import { CommonButton } from '@/components';
import { get } from 'lodash';

const transactionColumns: Array<GridColDef & IDataRow> = [
  { headerName: 'TxnHash', field: 'parent_txid', type: 'end-code' },
  {
    headerName: 'Type',
    field: 'action',
    render: (record) => {
      const typeText = (get(record, 'action') || '')?.toString().toLowerCase();
      const map = {
        burn: 'danger',
        mint: 'primary',
        transfer: 'default',
      };
      return <CommonButton type={get(map, [typeText]) as 'danger' | 'primary' | 'default'} text={typeText} />;
    },
  },
  { headerName: 'Amount', field: 'format_amount', type: 'comma' },
  { headerName: 'From', field: 'from_address', type: 'copy', hideable: true },
  { headerName: 'To', field: 'to_address', type: 'copy', hideable: true },
  { headerName: 'Date', field: 'block_time', type: 'timestamp', hideable: true },
];
export default transactionColumns;
