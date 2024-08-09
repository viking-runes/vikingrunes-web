import { FC, ReactNode, useContext, useState } from 'react';
import { ClickAwayListener, ThemeProvider, Tooltip } from '@mui/material';
import styles from './index.module.less';
import cn from 'classnames';
import AssetsIcon from '@/assets/images/icon/profile/assets.svg?react';
import MyOrder from '@/assets/images/icon/profile/myOrder.svg?react';
import MyRunes from '@/assets/images/icon/profile/myRunes.svg?react';
import BTCIcon from '@/assets/images/icon/profile/btc.svg?react';
import Disconnect from '@/assets/images/icon/profile/exit.svg?react';
import { useNavigate } from 'react-router-dom';
import { tooltipStyles } from '@/assets/styles/tooltip';
import { useWallet } from '@/stores/wallet';
import { formatAddress } from '@/utils/format';
import ProfileContext from '@/context';
import { fixedNumber, onFormat } from '@/utils';
import { ProfileTab } from '@/types';
interface IMenuItems {
  [K: string]: {
    icon: ReactNode;
    text: string;
    profile?: string;
    path?: string;
    onClick?: () => void;
  };
}
const ProfileAction: FC<{ onDisconnect: () => void }> = ({ onDisconnect }) => {
  const { wallet } = useWallet();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { point } = useContext<{ point?: string }>(ProfileContext);
  const menuItems: IMenuItems = {
    assets: { icon: <AssetsIcon />, text: 'Viking Points:', profile: onFormat(point) },
    runes: { icon: <MyRunes />, text: 'My Runes', path: '/profile/MyAssets' },
    order: { icon: <MyOrder />, text: 'My Orders', path: `/profile/MyAssets?tab=${ProfileTab.Stakes}` },
    balance: { icon: <BTCIcon />, text: 'BTC Balance:', profile: ` ${fixedNumber(wallet.balance.total)}` },
    disconnect: { icon: <Disconnect />, text: 'Disconnect', onClick: onDisconnect },
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        <ThemeProvider theme={tooltipStyles()}>
          <Tooltip
            PopperProps={{ disablePortal: true }}
            open={open}
            title={
              <ul className={cn(styles.menus, 'd-flex gap-12 flex-column')}>
                {Object.values(menuItems).map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                          return;
                        }
                        item.path && navigate(item.path);
                        onClose();
                      }}
                      className={cn(styles.item, 'gap-8 d-flex align-items-center')}
                      key={index + index}
                    >
                      <i className={styles.icon}>{item.icon}</i>
                      <p className={cn(styles.text)}>
                        <span>{item.text}</span>
                        {item.profile && <span>{item.profile}</span>}
                      </p>
                    </li>
                  );
                })}
              </ul>
            }
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom-end"
            arrow={true}
          >
            <p onClick={() => setOpen(true)} className={cn(styles.login, { [styles.active]: open })}>
              {formatAddress(wallet.address)}
            </p>
          </Tooltip>
        </ThemeProvider>
      </div>
    </ClickAwayListener>
  );
};
export default ProfileAction;
