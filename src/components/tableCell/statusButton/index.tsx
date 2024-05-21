import { FC } from 'react';
import styles from './index.module.less';
import SuccessIcon from '@/assets/images/icon/profile/success.svg?react';
import FailIcon from '@/assets/images/icon/profile/fail.svg?react';
import ConfirmingIcon from '@/assets/images/icon/profile/confirming.svg?react';
import cn from 'classnames';
interface IProps {
  type: 'Success' | 'Fail' | 'Confirming';
  text: string;
}
const StatusButton: FC<IProps> = ({ type, text }) => {
  const iconMap = {
    Success: <SuccessIcon />,
    Fail: <FailIcon />,
    Confirming: <ConfirmingIcon />,
  };
  return (
    <p className={cn(styles['status-btn'], styles[type?.toLowerCase()], 'gap-5 d-flex')}>
      <i className={cn(styles.icon, 'd-flex align-items-center')}>{iconMap[type]}</i>
      <span>{text}</span>
    </p>
  );
};
export default StatusButton;
