import { FC, Fragment, ReactNode } from 'react';
import cn from 'classnames';
import styles from './index.module.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useWallet } from '@/stores/wallet.ts';
import ExplorerIcon from '@/assets/images/icon/layouts/explorer.svg?react';
import FairMintIcon from '@/assets/images/icon/layouts/fairmint.svg?react';
import MarketIcon from '@/assets/images/icon/layouts/market.svg?react';
type NavItem = {
  name: string | ReactNode;
  path: string;
  includes?: string[];
  type?: 'slice';
  needConnect?: boolean;
  tooltip?: string;
  mobile?: string;
  icon?: ReactNode;
};

const navs: NavItem[] = [
  { name: 'Explorer', icon: <ExplorerIcon />, tooltip: 'Explorer', path: '/explorer', includes: ['/explorer', '/rune'], needConnect: false },
  { name: 'Fair mint', icon: <FairMintIcon />, mobile: 'FairMint', tooltip: 'Fair Mint', path: '/fairMint', includes: ['/fairMint'], needConnect: true },
  { name: 'Market', icon: <MarketIcon />, tooltip: 'Market', path: '/market', includes: ['/market'], needConnect: true },
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
                })}
              >
                {type === 'mobile' && <i>{nav.icon}</i>}
                {type === 'mobile' ? <span>{nav.mobile || nav.tooltip}</span> : nav.name}
              </span>
            </p>
          );
          return <Fragment key={index + index}>{child}</Fragment>;
        })}
    </nav>
  );
};
export default Nav;
