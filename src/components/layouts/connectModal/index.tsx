import { FC } from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@/assets/images/icon/closeIcon.svg?react';
import styles from './index.module.less';
// import LeatherIcon from '@/assets/images/wallet/leather.png';
import okxIcon from '@/assets/images/wallet/okx.png';
import unisatIcon from '@/assets/images/wallet/unisat.png';
import xverseIcon from '@/assets/images/wallet/xverse.png';
import cn from 'classnames';
import { Box, ThemeProvider } from '@mui/material';
import { modalBoxStyle } from '@/assets/styles/modalBox';
// import { verseConnect } from '@/components/layouts/connectModal/XverseConnect';
// import useXverse from '@/hooks/wallet/use-xverse';
import { useSnackbar } from '@/components/snackbar';
import useOkx from '@/hooks/wallet/use-okx';
import useUnisat from '@/hooks/wallet/use-unisat';
interface IProps {
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel: () => void;
}
const ConnectModal: FC<IProps> = (props) => {
  const { isModalOpen, handleCancel } = props;

  // const xverseHook = useXverse();
  const okxHook = useOkx();
  const unisatHook = useUnisat();
  const { enqueueSnackbar } = useSnackbar();

  const walletItems = [
    {
      text: 'UniSat',
      icon: unisatIcon,
      onClick: async () => {
        if (unisatHook.isWalletInstalled) {
          await unisatHook.connect();
          handleCancel();
        } else {
          enqueueSnackbar('Please install UniSat wallet', {
            variant: 'error',
          });
        }
      },
    },
    // {
    //   text: 'Xverse',
    //   icon: xverseIcon,
    //   onClick: async () => {
    //     if (xverseHook.isWalletInstalled) {
    //       await xverseHook.connect();
    //       handleCancel();
    //     } else {
    //       enqueueSnackbar('Please install Xverse wallet', {
    //         variant: 'error',
    //       });
    //     }
    //   },
    // },
    // { text: 'Leather', icon: LeatherIcon },
    {
      text: 'OKX',
      icon: okxIcon,
      onClick: async () => {
        if (okxHook.isWalletInstalled) {
          await okxHook.connect();
          handleCancel();
        } else {
          enqueueSnackbar('Please install OKX wallet', {
            variant: 'error',
          });
        }
      },
    },
  ];

  return (
    <Modal className={styles.modal} open={isModalOpen} onClose={handleCancel}>
      <div>
        <ThemeProvider theme={{ palette: { primary: { main: 'rgba(0,0,0,0)' } } }}>
          <Box sx={{ ...modalBoxStyle, width: 'var(--ex-connect-modal-width)' }}>
            <h1 className={styles.title}>
              <span>Choose Wallet</span>
              <i className={styles.close} onClick={handleCancel}>
                <CloseIcon />
              </i>
            </h1>
            <ul className={cn(styles.line, 'd-flex flex-column align-items-center justify-content-center')}>
              {walletItems.map((item) => (
                // <li onClick={item.onClick} key={item.text} className={cn(styles.row, 'd-flex  align-items-center', { [styles.disabled]: item.text === 'OKX' })}>
                // TODO: OKX
                <li onClick={item.onClick} key={item.text} className={cn(styles.row, 'd-flex  align-items-center')}>
                  <i>
                    <img alt={item.text} src={item.icon} />
                  </i>
                  <span>{item.text} Wallet</span>
                </li>
              ))}
            </ul>
          </Box>
        </ThemeProvider>
      </div>
    </Modal>
  );
};
export default ConnectModal;
