import { FC, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import styles from './index.module.less';
import EtchTab from '@/pages/etch/components/etchTab';
import BurnTab from '@/pages/etch/components/burnTab';
import EmptyPlaceholder from '@/components/layouts/emptyPlaceholder';

const Etch: FC = () => {
  const [activeTab, setActiveTab] = useState('etch');
  const tabList = [
    { label: 'Etch', value: 'etch' },
    { label: 'Burn', value: 'burn' },
  ];

  return (
    <EmptyPlaceholder
      subText={
        <p>
          If you need etch service, please contact{' '}
          <a href={'https://t.me/dupforlove'} target={'_blank'} rel="noreferrer">
            Michael
          </a>{' '}
          on telegram: @dupforlove
        </p>
      }
      text={'Etch'}
      isEmpty={true}
    >
      <div className={styles.page}>
        <Tabs
          className={styles.tabs}
          value={activeTab}
          onChange={(_, value) => {
            setActiveTab(value);
          }}
          TabIndicatorProps={{ children: <span className={styles.indicator} /> }}
          variant="fullWidth"
        >
          {tabList.map((tab) => (
            <Tab {...tab} key={tab.value} />
          ))}
        </Tabs>
        <div>
          {activeTab === 'etch' && <EtchTab />}
          {activeTab === 'burn' && <BurnTab />}
        </div>
      </div>
    </EmptyPlaceholder>
  );
};
export default Etch;
