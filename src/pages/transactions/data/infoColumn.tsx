import { IInfoCardDataItem } from '@/components/InfoCard';
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
  ],
];
