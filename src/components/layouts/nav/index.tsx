import { FC, Fragment, ReactNode } from 'react';
import cn from 'classnames';
import styles from './index.module.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useWallet } from '@/stores/wallet.ts';
import PumpIcon from '@/assets/images/icon/pumpIcon.svg?react';
import { Tooltip } from '@mui/material';
import ExplorerIcon from '@/assets/images/icon/layouts/explorer.svg?react';
import FairMintIcon from '@/assets/images/icon/layouts/fairmint.svg?react';
import MarketIcon from '@/assets/images/icon/layouts/market.svg?react';
import RunesPumpIcon from '@/assets/images/icon/layouts/runespump.svg?react';

type NavItem = {
  name: string | ReactNode;
  path: string;
  includes?: string[];
  type?: 'slice';
  needConnect?: boolean;
  tooltip?: string;
  mobile?: string;
  icon?: ReactNode;
  normalNav?: boolean;
};

const navs: NavItem[] = [
  { name: 'ᛖXᛈᛚᛟᚱᛖᚱ', icon: <ExplorerIcon />, tooltip: 'Explorer', path: '/', includes: ['/', '/rune'], type: 'slice', needConnect: false, normalNav: false },
  { name: 'ᚠᚨᛁᚱ ᛗᛁᚾᛏ', icon: <FairMintIcon />, mobile: 'FairMint', tooltip: 'Fair Mint', path: '/fairMint', includes: ['/fairMint'], needConnect: true, normalNav: false },
  // { name: 'ᛗᚨᚱᚲᛖᛏ', icon: <MarketIcon />, tooltip: 'Market', path: '/market', includes: ['/market'], needConnect: true, normalNav: false },
  { name: 'Freemint', icon: <MarketIcon />, mobile: 'Freemint', tooltip: 'Freemint', path: '/freemint', includes: ['/freemint'], needConnect: true, normalNav: true },
  { name: 'Staking', icon: <RunesPumpIcon />, tooltip: 'Staking', path: '/staking', includes: ['/staking'], type: 'slice', needConnect: true, normalNav: true },
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
        .filter((item) => type !== 'mobile' || item.icon)
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
                navigate(nav.path);
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
                {type === 'mobile' ? (
                  <span>{nav.mobile || nav.tooltip}</span>
                ) : nav.type === 'slice' && typeof nav?.name === 'string' ? (
                  nav.name?.split('').map((text, idx) => {
                    return (
                      <span className={cn({ [styles['lg']]: idx === 1 })} key={text + idx}>
                        {text}
                      </span>
                    );
                  })
                ) : (
                  nav.name
                )}
              </span>
            </p>
          );
          return (
            <Fragment key={index + index}>
              {nav?.tooltip ? (
                <Tooltip placement={'top-start'} title={<span className={'fontSize-16'}>{nav.tooltip}</span>}>
                  {child}
                </Tooltip>
              ) : (
                child
              )}
            </Fragment>
          );
        })}
    </nav>
  );
};
export default Nav;
