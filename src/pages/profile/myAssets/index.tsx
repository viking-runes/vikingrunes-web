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
        <ProfileTable address={'bc1p50n9sksy5gwe6fgrxxsqfcp6ndsfjhykjqef64m8067hfadd9efqrhpp9k' || wallet?.address} />
      </div>
    </div>
  );
};
export default MyAssets;
