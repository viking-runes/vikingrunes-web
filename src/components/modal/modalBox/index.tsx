import React, { FC, PropsWithChildren } from 'react';
import { formModalStyle } from '@/assets/styles/modalBox';
import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './index.module.less';
import cn from 'classnames';
import { PrimaryButton } from '@/components';
import FailIcon from '@/assets/images/icon/profile/fail.svg?react';
interface IProps {
  title: string;
  data?: Partial<ISearchToken & IRuneDetailItem> & { subInfo: string };
  onConfirm?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  errorMsg?: string;
  text?: React.ReactNode;
}
const ModalBox: FC<PropsWithChildren<IProps>> = ({ errorMsg, data, disabled, text, onClose, onConfirm, title, children }) => {
  return (
    <div>
      <Box sx={{ ...formModalStyle, width: '41.75rem' }}>
        <div className={styles.content}>
          <div className={cn(styles.header, 'd-flex justify-content-between align-items-center')}>
            <p>{title}</p>
            <i className={styles.icon} onClick={onClose}>
              <ClearIcon />
            </i>
          </div>
          <div className={styles['container']}>
            {text ? (
              text
            ) : (
              <div className={cn(styles.rune, 'd-flex')}>
                <i className={styles.avatar}>
                  <img src={data?.rune_logo} alt={'avatar'} />
                </i>
                <p className={cn(styles['rune-text'], 'd-flex flex-column')}>
                  <span>{data?.rune}</span>
                  {data?.subInfo && <span className={styles['sub-info']}>{data?.subInfo}</span>}
                </p>
              </div>
            )}
            <div className={styles.box}>{children}</div>
          </div>
          <footer className={styles.footer}>
            {errorMsg && (
              <p className={styles['error-message']}>
                <i className={styles.icon}>
                  <FailIcon />
                </i>
                <span>{errorMsg}</span>
              </p>
            )}
            <PrimaryButton onClick={onConfirm} size={'lg'} width={'100%'} text={'Confirm'} type={disabled ? 'grey' : 'primary'} />
          </footer>
        </div>
      </Box>
    </div>
  );
};
export default ModalBox;
