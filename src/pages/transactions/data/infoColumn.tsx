import { IInfoCardDataItem } from '@/components/InfoCard';
import { formatStakeCountDown } from '@/utils/format';
import { Fragment } from 'react';

export const infoColumn: Array<Array<IInfoCardDataItem>> = [
  [
    { title: 'Timestamp', type: 'timestamp', field: 'block_time' },
    {
      title: 'Fee',
      field: 'fee',
      render: (record) => {
        return (
          <Fragment>
            {`${record['fee']}`} sats <span className={'primary-color'}>${`${record['sats']}`}</span>
          </Fragment>
        );
      },
    },
  ],
  [
    { title: 'Block', field: 'block_height' },
    {
      title: 'Fee rate',
      field: 'fee_rate',
      render: (record) => {
        return `${record['fee_rate']} sats/vB`;
      },
    },
    {
      title: 'Countdown',
      field: 'stake_data',
      render: (rowData: any) => {
        const ts = rowData?.stake_data?.stake?.lock_time;
        return formatStakeCountDown(ts);
      },
    },
  ],
];
