import { PropsWithChildren, FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
interface IProps {
  onClick?: () => void;
  width?: string;
}
const AlignCell: FC<PropsWithChildren<IProps>> = ({ children, width, onClick }) => {
  return (
    <div onClick={onClick} className={'w-100 d-flex align-items-center justify-content-center'}>
      <div style={{ width }} className={cn(styles.content)}>
        {children}
      </div>
    </div>
  );
};
export default AlignCell;
