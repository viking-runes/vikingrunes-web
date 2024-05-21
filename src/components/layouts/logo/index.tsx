import { FC } from 'react';

import Logo from '@/assets/images/icon/logoName.png';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
const LogoCom: FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return (
    <i className={cn(styles['exploer-logo'])} onClick={onClick}>
      <img src={Logo} alt={'logo'} />
    </i>
  );
};
export default LogoCom;
