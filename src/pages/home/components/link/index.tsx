import { FC } from 'react';
import styles from './index.module.less';
import commonStyles from '../../index.module.less';
import LinkIcon from '@/assets/images/home/bg/arrow.svg?react';
import cn from 'classnames';
import config from '@/config';
const Link: FC = () => {
  const links = [
    { name: 'UTXO-Staking Protocol', url: config.protocol },
    { name: 'Token Economics', url: config.tokenEconomics },
    { name: 'Roadmap', url: config.roadmap },
  ];
  return (
    <div className={'d-flex justify-content-center'}>
      <div className={styles.content}>
        <h3 className={cn(commonStyles.hello, commonStyles.link)}>Links</h3>
        <ul className={cn(styles.link, 'd-flex flex-column gap-16')}>
          {links.map((item) => (
            <li
              key={item.name}
              className={cn('d-flex gap-16 align-items-center fontSize-24')}
              onClick={() => {
                item.url && window.open(item.url);
              }}
            >
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
