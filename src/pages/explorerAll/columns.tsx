import { AvatarContent, EllipsisText, TablePercentage, AlignCell } from '@/components';
import { TProfileColumnItem } from '@/types/table';
import { onFormatNumber } from '@/utils';
const columns: TProfileColumnItem = (fn) => [
  { headerName: '#', field: 'index', hideable: true },
  {
    headerName: 'Rune',
    field: 'rune',
    type: 'avatar',
    render: (row: IRuneData) => {
      return (
        <AlignCell width={'12rem'} onClick={() => fn(row['rune_id'])}>
          <AvatarContent text={row['rune']} type={'table'} avatar={row?.['rune_logo']} />
        </AlignCell>
      );
    },
  },
  { headerName: 'Symbol', field: 'symbol', hideable: true },
  {
    headerName: 'Current Supply',
    field: 'supply',
    hideable: true,
    render: (row: IRuneData) => {
      return (
        <AlignCell width={'8rem'}>
          {row['viking_format']?.current_supply_abb}
        </AlignCell>
      );
    },
  },
  {
    headerName: 'Progress',
    field: 'divisibility',
    hideable: true,
    render: (row: IRuneData) => {
      return (
        <AlignCell width={'10rem'}>
          <TablePercentage {...row} />
        </AlignCell>
      );
    },
  },
  { headerName: 'Holders', field: 'holders', columnType: 'sort', type: 'comma' },
];
export default columns;
