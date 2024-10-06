import { FC } from 'react';
import styles from './index.module.less';
import Logo from '@/assets/images/home/bg/logo.png';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import LinkIcon from '@/assets/images/home/bg/arrow.svg?react';
import { Container, Typography } from '@mui/material';
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
      <Container className={styles.content}>
        <i className={cn(styles.logo, 'd-flex justify-content-center')}>
          <img alt={'logo'} src={Logo} />
        </i>

        <Typography fontSize={40} fontWeight={600} pt={4.25}>
          Hello
        </Typography>
        <Typography fontSize={40} fontWeight={400} color={'#EBB94C'}>
          <span style={{ color: '#fff' }}>#</span> VIKINGRUNES
        </Typography>

        <Typography fontSize={30} fontWeight={400} color={'#EBB94C'} pt={4.625}>
          The First UTXO-Based Bitcoin Native Staking Service Network, <br /> Decentralized and Self-hosted, built on UTXO-Staking Protocol.
        </Typography>
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
      </Container>
    </div>
  );
};
export default Banner;
