import { FC, useContext } from 'react';
import styles from './index.module.less';
import AssetsAvatar from '@/assets/images/icon/profile/avatar.png';
import cn from 'classnames';
import { CopyIcon } from '@/components';
import { formatAddress } from '@/utils/format.ts';
import ProfileContext from '@/context';
import { fixedNumber, onFormat } from '@/utils';
import { useWallet } from '@/stores/wallet';

const AssetsHeader: FC<{ address: string }> = ({ address }) => {
  // const { point } = useContext<{ point?: string }>(ProfileContext);
  const { wallet } = useWallet();

  return (
    <div className={cn(styles.header, 'd-flex gap-25 align-items-center')}>
      <i className={styles.avatar}>
        <img src={AssetsAvatar} alt={'avatar'} />
      </i>
      <div className={cn(styles.profile, 'd-flex justify-content-between flex-1')}>
        <ul className={cn(styles.info, 'd-flex flex-column gap-16')}>
          <li className={cn(styles.text, 'd-flex justify-content-center gap-10')}>
            <span>{formatAddress(address)}</span>
            <CopyIcon fontSize={'1.1875rem'} code={address} />
          </li>
          {/* <li className={styles.label}>BTC Balance: {onFormat(point)}</li> */}
          <li className={styles.label}>BTC Balance: {fixedNumber(wallet.balance.total)} </li>
        </ul>
        {/* <ul className={cn(styles.info, 'd-flex flex-column gap-16')}>
          <li className={styles.text}>$----</li>
          <li className={styles.label}>Total Value</li>
        </ul> */}
      </div>
    </div>
  );
};
export default AssetsHeader;
