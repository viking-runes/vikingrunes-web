import { FC, ReactNode } from 'react';
import LowSatsIcon from '@/assets/images/icon/profile/lowStas.svg?react';
import StandardSatsIcon from '@/assets/images/icon/profile/standardStas.svg?react';
import HighSatsIcon from '@/assets/images/icon/profile/highStas.svg?react';
import styles from './index.module.less';
import cn from 'classnames';
export interface ISatsSelectItem {
  icon: ReactNode;
  des: string;
  level: string;
  name: string;
}

interface IProps {
  onChange: (T: string) => void;
  value: string;
  selectType?: 'etch';
  sats?: ISearchToken['fees_recommended'];
}
const SatsSelect: FC<IProps> = ({ onChange, value, selectType, sats }) => {
  const items: ISatsSelectItem[] = [
    { icon: <LowSatsIcon />, des: ` Sats/vB`, level: 'Low', name: 'low' },
    { icon: <StandardSatsIcon />, des: ` Sats/vB`, level: 'Standard', name: 'standard' },
    { icon: <HighSatsIcon />, des: ` Sats/vB`, level: 'High', name: 'high' },
  ];
  return (
    <ul className={cn(styles['sats-select'], styles[selectType], 'd-flex justify-content-between')}>
      {items.map((item) => {
        return (
          <li className={cn(styles[selectType], { [styles.select]: value === item.name }, styles['sats-item'], 'd-flex flex-column justify-content-center align-items-center')} key={item.name} onClick={() => onChange(item.name)}>
            <i className={styles.icon}>{item.icon}</i>
            <p className={cn(styles.des, 'fontSize-10 margin-bottom-3')}>
              {sats?.[item?.name] || '0'}
              {item.des}
            </p>
            <span className={cn(styles.level, 'fontSize-12')}>{item.level}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default SatsSelect;
