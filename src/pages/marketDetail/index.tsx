import { FC, useState } from 'react';
import MarketInfo from './components/marketInfo';
import styles from './index.module.less';
import { Tab, Tabs } from '@mui/material';
import MarketTab from './components/marketTab';
import ActivityTab from './components/activityTab';
import OrderTab from '@/pages/marketDetail/components/orderTab';
const MarketDetail: FC = () => {
  const tabList = [
    { label: 'Market', value: 'market' },
    { label: 'Activity', value: 'activity' },
    { label: 'Orders', value: 'orders' },
  ];
  const [activeTab, setActiveTab] = useState('market');
  return (
    <div>
      <MarketInfo />
      <div className={styles.card}>
        <Tabs style={{ marginBottom: '1rem' }} value={activeTab} onChange={(_, value) => setActiveTab(value)}>
          {tabList.map((tab) => (
            <Tab {...tab} key={tab.value} />
          ))}
        </Tabs>
        {activeTab === 'market' && <MarketTab />}
        {activeTab === 'activity' && <ActivityTab />}
        {activeTab === 'orders' && <OrderTab />}
      </div>
    </div>
  );
};
export default MarketDetail;
