import { FC } from 'react';
import AvatarImg from '@/assets/images/market/avatar.png';
import styles from './index.module.less';
import cn from 'classnames';
const info: { title: string; text: string; isLightText?: boolean }[] = [
  { title: '24H Change', text: '+6.46%', isLightText: true },
  { title: '24H Volume', text: '1.999 BTC' },
  { title: 'Total Volume', text: '9999 BTC' },
  { title: 'Total Supply', text: '999,999,999' },
  { title: 'Market Cap', text: '280 BTC' },
  { title: 'Holders', text: '999,999' },
];
const MarketInfo: FC = () => {
  return (
    <div className={cn(styles.wrapper, 'd-flex gap-50 align-items-center')}>
      <i className={styles.avatar}>
        <img src={AvatarImg} alt={'BOBOASDFDXXOO'} />
      </i>
      <div className={cn('flex-1 d-flex flex-column align-self-stretch justify-content-between')}>
        <p className={'fontSize-16 primary-color'}>BOBOASDFDXXOO</p>
        <div className={cn(styles['info-card'], 'd-flex justify-content-around')}>
          {info.map((item) => {
            return (
              <p key={item.title} className={cn('d-flex flex-column gap-12')}>
                <span className={'fontSize-14'}>{item.title}</span>
                <span className={cn('fontSize-12', { ['primary-color']: item.isLightText })}>{item.text}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MarketInfo;
