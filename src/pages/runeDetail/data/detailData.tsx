import { IInfoCardDataItem } from '@/components/InfoCard';
import { get } from 'lodash';

const detailData: Array<Array<IInfoCardDataItem>> = [
  [
    { title: 'Rune ID', field: 'rune_id' },
    { title: 'Current Supply', field: 'format_supply', type: 'comma' },
    { title: 'Cap supply', field: 'cap_supply', type: 'div' },
    { title: 'Transactions', field: 'format_transactions', type: 'comma' },
    { title: 'Amount', field: ['terms', 'amount'], type: 'comma' },
  ],
  [
    { title: 'Mints', field: 'mints', type: 'comma' },
    { title: 'Symbol', field: 'symbol' },
    { title: 'Divisibility', field: 'divisibility' },
    { title: 'Etch Txs', field: 'etching', type: 'txs-code' },
    { title: 'Holders', field: 'format_holders', type: 'comma' },
  ],
  [
    { title: 'Start block', field: ['block', 'start'] },
    {
      title: 'End Before Block',
      render: (data: IDataSource) => `${get(data, ['block', 'end'])}`,
    },
    { title: 'Timestamp', field: 'block_time', type: 'timestamp' },
  ],
];
export default detailData;
