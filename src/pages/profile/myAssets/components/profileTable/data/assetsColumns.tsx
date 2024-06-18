import { AlignCell, AvatarContent, PrimaryButton } from '@/components';
import { TProfileColumnItem } from '@/types/table';
export const assetsColumns: TProfileColumnItem = (fn) => [
  { headerName: '#', field: 'index', hideable: true },
  {
    headerName: 'Rune',
    field: 'rune',
    type: 'avatar',
    render: (row: IRuneData) => {
      return (
        <AlignCell width={'12rem'}>
          <AvatarContent text={row['rune']} avatar={row?.['rune_logo']} />
        </AlignCell>
      );
    },
  },
  { headerName: 'Balance', field: 'balance', type: 'comma', hideable: true },
  {
    headerName: 'Action',
    field: 'action',
    render: (row) => {
      return (
        <div className={'d-flex align-items-center justify-content-center'}>
          <div className={'d-flex gap-12'}>
            <PrimaryButton onClick={fn.bind(null, 'Transfer', row)} text={'Transfer'} type={'default'} />
          </div>
        </div>
      );
    },
  },
];
