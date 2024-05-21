import { formatAddress } from '@/utils/format.ts';
import { onFormat } from '@/utils';

interface IBoardColumn {
  name: string;
  field: string;
  format?: (T: string, P: TBoardItem) => void;
}
export const mintColumn: IBoardColumn[] = [
  { name: 'Progress', field: 'progress' },
  { name: 'Mint times(4h)', field: 'mint_times_4h', format: onFormat },
  { name: 'Address', field: 'address_times', format: onFormat },
];
export const tradeColumn: IBoardColumn[] = [
  {
    name: 'From',
    field: 'from_address',
    format: (address: string) => {
      return `${formatAddress(address)}`;
    },
  },
  {
    name: 'To',
    field: 'to_address',
    format: (address: string) => {
      return `${formatAddress(address)}`;
    },
  },
  { name: 'Transactions(24h)', field: 'transactions_24h', format: onFormat },
];
