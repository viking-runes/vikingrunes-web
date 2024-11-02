import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import config from '@/config';
const VikingBox: FC = () => {
  const imgs = ['1topLeftBack', '2topCenterBack', '3topRightBack', '4centerLeftBack', '5center', '6img', '7img', '8img', '9img'];
  return (
    <div className={cn(styles['box'], 'margin-top-10', 'd-media-none')}>
      <div className={cn(styles['wrapper'], 'd-flex align-items-center')}>
        <ul className={cn(styles.runes, 'd-flex  gap-14')}>
          {imgs.map((key) => {
            const isCenter = key.includes('5center');
            return (
              <li key={key} className={cn(styles['flipper'], { [styles.center]: isCenter })}>
                {!isCenter && <p className={cn({ [styles['font']]: !isCenter })}>{<img src={`${config.assetsUrl}/font.png`} alt="" />}</p>}
                <p className={cn({ [styles['back']]: !isCenter })}>{<img src={`${config.assetsUrl}/${key}.png`} alt="" />}</p>
              </li>
            );
          })}
        </ul>
        <p className={cn(styles.text, 'gap-10 d-flex flex-column justify-content-end fontSize-12 black-color white-space-nowrap text-align-right')}>
          <span>RUNESPUMP aims to provide degens on the chain with the latest transaction information to help them navigate and find the beautiful world of alpha.</span>
          <span className={'fontSize-14'}>Mint Before Disappeared</span>
          <span> Ranked by the number of fairmints in the last 4 hours</span>
          <span className={'fontSize-14'}>Sailing In Transactions</span>
          <span> Ranked by the number of Transactions in the last 12 hours</span>
        </p>
      </div>
    </div>
  );
};
export default VikingBox;
