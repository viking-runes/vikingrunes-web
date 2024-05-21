import { FC, Fragment, useState } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import LogoCom from '@/components/layouts/logo';
import ConnectModal from '@/components/layouts/connectModal';
import TwitterIcon from '@/assets/images/icon/twitterLink.png';
import ProfileAction from '@/components/layouts/profileAction';
import BlockHeight from '@/components/layouts/blockHeight';
import { useWallet } from '@/stores/wallet';
import Nav from '@/components/layouts/nav';

const Header: FC = () => {
  const [isConnect, setIsConnect] = useState(false);

  const { wallet, disconnect } = useWallet();
  return (
    <Fragment>
      <header className={cn(styles['page-header'], 'd-flex align-items-center justify-content-between')}>
        <div className={cn(styles['header-left'], 'd-flex align-items-center')}>
          <LogoCom />
          <Nav />
        </div>
        <div className={cn(styles['user-center'], ' d-flex justify-content-center align-items-center')}>
          <BlockHeight />
          <a className={cn(styles['twitter'], 'd-media-none')} href={'https://twitter.com/VikingRunes'} target={'_blank'} rel="noreferrer">
            <img alt={'twitter'} src={TwitterIcon} />
          </a>
          {wallet.address ? (
            <ProfileAction onDisconnect={() => disconnect()} />
          ) : (
            <p onClick={() => setIsConnect(true)} className={styles['login']}>
              ᚳᛟᚾᚾᛖᚳᛏ
            </p>
          )}
        </div>
      </header>
      <ConnectModal isModalOpen={isConnect} handleCancel={() => setIsConnect(false)} />
      <div className={styles['header-placeholder']} />
    </Fragment>
  );
};
export default Header;
