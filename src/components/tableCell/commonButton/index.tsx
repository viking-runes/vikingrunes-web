import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
interface IProps {
  text: string;
  type?: 'danger' | 'primary' | 'default';
  width?: string;
}

const CommonButton: FC<IProps> = ({ type = 'default', text, width }) => {
  return (
    <a className={cn(styles[type], styles.btn)} style={{ width }}>
      <span>{text}</span>
    </a>
  );
};
export default CommonButton;
