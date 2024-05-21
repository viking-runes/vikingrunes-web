import { GridColDef } from '@mui/x-data-grid';
import { AlignCell, AvatarContent, CommonButton, IDataRow } from '@/components';
import { get } from 'lodash';
import { BUTTON_MAP } from '@/utils/contant.ts';

export const transfersColumns: Array<GridColDef & IDataRow> = [
  {
    headerName: 'Rune',
    field: 'rune',
    render: (row: IRuneData) => {
      return (
        <AlignCell width={'12rem'}>
          <AvatarContent text={row['rune']} avatar={row?.['rune_logo']} />
        </AlignCell>
      );
    },
  },
  {
    headerName: 'Action',
    field: 'action',
    render: (record) => {
      const typeText = (get(record, 'action') || '')?.toLowerCase();
      return (
        <div className={'d-inline-flex width-4rem text-align-left align-items-center'}>
          <CommonButton type={get(BUTTON_MAP, [typeText])} text={typeText} />
        </div>
      );
    },
  },
  { headerName: 'Amount', field: 'format_amount' },
  { headerName: 'From', field: 'from_address', type: 'copy' },
  { headerName: 'To', field: 'to_address', type: 'copy' },
  { headerName: 'Date', field: 'block_time', type: 'timestamp' },
];
