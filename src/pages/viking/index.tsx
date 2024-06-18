import { FC } from 'react';
import styles from './index.module.less';
import { CommonTable } from '@/components';
import { vikingColumns } from '@/pages/viking/data/columns.ts';
import { mockData } from '@/pages/viking/data/mockData.ts';

const Viking: FC = () => {
  const dataArray = [
    { title: 'Current Locked', value: '999,999,999,999' },
    { title: 'Current Circulation', value: '999,999,999,999' },
    { title: 'Staking-Reward Amount', value: '999,999,999,999' },
    { title: 'Staking-Reward Locked', value: '999,999,999,999' },
  ];
  return (
    <div>
      <ul className={styles.container}>
        {dataArray.map((item) => (
          <li key={item.title} className={styles.item}>
            <p className={styles.title}>{item.title}</p>
            <span className={styles.value}>{item.value}</span>
          </li>
        ))}
      </ul>
      <div className={'margin-top-20'}>
        <CommonTable columns={vikingColumns} dataSource={mockData} />
      </div>
    </div>
  );
};
export default Viking;
