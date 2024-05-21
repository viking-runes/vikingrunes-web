import { FC } from 'react';
import LogoCom from '@/components/layouts/logo';
import styles from './index.module.less';
import cn from 'classnames';
import Nav from '@/components/layouts/nav';

const Footer: FC = () => {
  return (
    <footer className={cn(styles['page-footer'], 'd-flex align-items-center justify-content-between')}>
      <div className={'d-flex content align-items-center d-media-none'}>
        <LogoCom />
        <p className={styles.text}>VIKINGRUNES.</p>
      </div>
      <div className={cn('d-media-mobile', styles['mobile-nav'])}>
        <Nav type={'mobile'} />
      </div>
    </footer>
  );
};
export default Footer;
