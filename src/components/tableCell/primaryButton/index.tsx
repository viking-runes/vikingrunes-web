import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './index.module.less';
interface IProps {
  text: string;
  type?: 'danger' | 'primary' | 'default' | 'disabled' | 'grey';
  width?: string;
  onClick?: () => void;
  size?: 'lg' | 'xs' | 'md';
  disabled?: boolean;
}
const PrimaryButton: FC<IProps> = ({ size, disabled, onClick, width, text, type = 'default' }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      style={{ width }}
      className={cn({ [styles.disabled]: disabled }, styles['ripple-button'], styles[type], styles[size])}
      onClick={(e) => {
        e.stopPropagation();
        const rect = (e.target as HTMLElement)?.getBoundingClientRect?.();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick?.();
      }}
    >
      {isRippling && <span className={cn(styles['ripple'], styles[type])} style={{ left: coords.x, top: coords.y }} />}
      <span className={styles['content']}>{text}</span>
    </button>
  );
};
export default PrimaryButton;
