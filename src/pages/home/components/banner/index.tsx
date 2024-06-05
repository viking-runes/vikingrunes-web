import { FC } from 'react';
import styles from './index.module.less';
import Logo from '@/assets/images/home/bg/logo.png';
import commonStyles from '../../index.module.less';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import LinkIcon from '@/assets/images/home/bg/arrow.svg?react';
const Banner: FC = () => {
  const linkItems = [
    {
      path: '/explorer',
      name: 'Explorer',
    },
    {
      path: '/staking',
      name: 'Stake',
    },
  ];
  return (
    <div className={styles.bg}>
      <div className={styles.content}>
        <i className={cn(styles.logo, 'd-flex justify-content-center')}>
          <img alt={'logo'} src={Logo} />
        </i>
        <h2 className={commonStyles.hello}>Hello</h2>
        <h3 className={commonStyles.title}>VIKINGRUNES</h3>
        <p className={commonStyles.banner}>The first UTXO-based Bitcoin native staking service network, one of the basic services of the Bitcoin network, built using the UTXO-Staking protocol</p>
        <ul className={cn(styles.link, 'd-flex flex-column')}>
          {linkItems.map((item) => (
            <Link to={item.path} key={item.name}>
              <i>
                <LinkIcon />
              </i>
              <span>{item.name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Banner;
