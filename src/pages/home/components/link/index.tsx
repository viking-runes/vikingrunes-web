import { FC } from 'react';
import styles from './index.module.less';
import commonStyles from '../../index.module.less';
import LinkIcon from '@/assets/images/home/bg/arrow.svg?react';
import cn from 'classnames';
const Link: FC = () => {
  const links = [{ name: 'UTXO-Staking Protocol' }, { name: 'Token Economics' }, { name: 'Roadmap' }];
  return (
    <div className={'d-flex justify-content-center'}>
      <div className={styles.content}>
        <h3 className={commonStyles.hello}>Links</h3>
        <ul className={cn(styles.link, 'd-flex flex-column gap-16')}>
          {links.map((item) => (
            <li key={item.name} className={cn('d-flex gap-16 align-items-center fontSize-24')}>
              <LinkIcon />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Link;
