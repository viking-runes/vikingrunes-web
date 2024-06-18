import { FC, Fragment, ReactNode } from 'react';
import cn from 'classnames';
import styles from './index.module.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useWallet } from '@/stores/wallet.ts';
import ProfileIcon from '@/assets/images/icon/layouts/profile.svg?react';
import StakingIcon from '@/assets/images/icon/layouts/staking.svg?react';
import ExplorerIcon from '@/assets/images/icon/layouts/explorer.svg?react';
import FairMintIcon from '@/assets/images/icon/layouts/fairmint.svg?react';
import MarketIcon from '@/assets/images/icon/layouts/market.svg?react';
import RunesPumpIcon from '@/assets/images/icon/layouts/runespump.svg?react';

type NavItem = {
  name: string | ReactNode;
  path?: string;
  includes?: string[];
  type?: 'mobile';
  needConnect?: boolean;
  tooltip?: string;
  mobile?: string;
  icon?: ReactNode;
  normalNav?: boolean;
};

const navs: NavItem[] = [
  { name: 'Explorer', icon: <ExplorerIcon />, path: '/explorer', includes: ['/explorer', '/rune'], needConnect: false },
  { name: 'Fair mint', icon: <FairMintIcon />, mobile: 'FairMint', path: '/fairMint', includes: ['/fairMint'], needConnect: true },
  { name: 'Market', path: '/market', includes: ['/market'], needConnect: true },
  { name: 'Freemint', icon: <MarketIcon />, mobile: 'Freemint', tooltip: 'Freemint', path: '/freemint', includes: ['/freemint'], needConnect: true, normalNav: true },
  { name: 'Staking', icon: <RunesPumpIcon />, tooltip: 'Staking', path: '/staking', includes: ['/staking'], type: 'slice', needConnect: true, normalNav: true },
  { name: 'Profile', icon: <ProfileIcon className={styles['profile']} />, includes: ['/profile'], path: '/profile', type: 'mobile' },
  {
    name: '$Viking',
    path: '/viking',
    includes: ['/viking'],
  },
];

const Nav: FC<{ type?: 'mobile' }> = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { wallet } = useWallet();
  const path = `/${location.pathname?.split('/')?.[1] || ''}`;

  return (
    <nav className={cn('d-flex align-items-center', styles.nav, styles[type])}>
      {navs
        .filter((item) => (type === 'mobile' ? item.icon || item.type === 'mobile' : item.type !== 'mobile'))
        .map((nav, index) => {
          const child = (
            <p
              className={cn({ [styles.active]: nav.includes?.includes(path) }, 'd-flex align-items-center')}
              onClick={() => {
                if (nav.needConnect && !wallet.address) {
                  enqueueSnackbar('Please link wallet first!', {
                    variant: 'info',
                  });
                  return;
                }
                nav.path && navigate(nav.path);
              }}
            >
              <span
                className={cn('d-flex align-items-center', {
                  [styles.active]: nav.includes?.includes(location.pathname),
                  [styles['mobile-nav']]: type === 'mobile',
                  [styles['normal-nav']]: nav.normalNav,
                })}
              >
                {type === 'mobile' && <i>{nav.icon}</i>}
                {type === 'mobile' ? <span>{nav.mobile || nav.name}</span> : nav.name}
              </span>
            </p>
          );
          return <Fragment key={index + index}>{child}</Fragment>;
        })}
    </nav>
  );
};
export default Nav;
