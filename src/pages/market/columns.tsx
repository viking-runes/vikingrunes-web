import { TProfileColumnItem } from '@/types/table';
import { AvatarContent, PriceChange, UnitValue } from '@/components';
import { get } from 'lodash';
import AvatarImg from '@/assets/images/icon/profile/avatar.png';

export const columns: TProfileColumnItem = (fn) => [
  {
    headerName: 'Rune',
    field: 'rune',
    render: (row) => {
      return (
        <div onClick={() => fn(row)}>
          <AvatarContent text={row['rune']} type={'table'} avatar={AvatarImg} />
        </div>
      );
    },
  },
  {
    headerName: 'Unit Price',
    field: 'unit',
    render: (record) => {
      return <UnitValue unitText={get(record, ['unit'])} valueText={get(record, ['price'])} />;
    },
  },
  {
    hideable: true,
    headerName: 'Price change',
    field: 'price',
    render: (record) => {
      return <PriceChange text={record['price']} />;
    },
  },
  {
    headerName: 'Volume(1D)',
    hideable: true,
    hideSortIcons: true,
    field: 'total',
    render: (record) => {
      return <UnitValue unitText={get(record, ['total'])} valueText={get(record, ['value'])} />;
    },
  },
  {
    headerName: 'Volume(30D)',
    hideable: true,
    field: 'total',
    render: (record) => {
      return <UnitValue unitText={get(record, ['total'])} valueText={get(record, ['value'])} />;
    },
  },
  {
    headerName: 'Market cap',
    hideable: true,
    field: 'cap',
    render: (record) => {
      return <UnitValue unitText={get(record, ['total'])} valueText={get(record, ['value'])} />;
    },
  },
  { headerName: 'Holders', field: 'holders', hideable: true },
];
