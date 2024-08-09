import { FC } from 'react';
import AssetsHeader from '@/pages/profile/myAssets/components/assetsHeader';
import styles from './index.module.less';
import ProfileTable from '@/pages/profile/myAssets/components/profileTable';
import { useWallet } from '@/stores/wallet.ts';

const MyAssets: FC = () => {
  const { wallet } = useWallet();
  return (
    <div>
      <AssetsHeader address={wallet?.address} />
      <p className={styles.divider} />
      <div className={styles.card}>
        <ProfileTable address={wallet?.address} />
      </div>
    </div>
  );
};
export default MyAssets;
