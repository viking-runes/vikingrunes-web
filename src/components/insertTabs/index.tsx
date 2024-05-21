import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
interface IProps {
  onTabChange?: (T: string) => void;
  value?: string;
  items?: Array<{ label: string; value: string }>;
  width?: string;
  gap?: string;
}
const InsertTabs: FC<IProps> = ({ onTabChange, gap = '0rem', width = '6.25rem', items, value }) => {
  const index = items?.findIndex((item) => item.value === value);
  const left = (parseFloat(width) + parseFloat(gap)) * index - 0.5;
  const activeWidth = parseFloat(width) + 1;
  return (
    <div className={'d-flex'}>
      <div className={cn(styles['insert-tabs'], 'd-flex')}>
        <ul style={{ gap }} className={cn(styles['tab-item'], 'd-flex justify-content-center align-items-center')}>
          {items?.map((item) => (
            <li className={cn(styles.btn, 'd-flex justify-content-center align-items-center')} key={item.value} style={{ width }} onClick={() => onTabChange(item.value)}>
              {item.label}
            </li>
          ))}
          <span style={{ left: `${left}rem`, width: `${activeWidth}rem` }} className={styles.active} />
        </ul>
      </div>
    </div>
  );
};
export default InsertTabs;
