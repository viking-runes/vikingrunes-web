import { CSSProperties, FC } from 'react';
import AvatarImg from '@/assets/images/icon/profile/rune.png';
import CloseIcon from '@/assets/images/icon/etch/closeIcon.svg?react';
import BlockIcon from '@/assets/images/icon/etch/block.svg?react';
import CapIcon from '@/assets/images/icon/etch/cap.svg?react';
import styles from './index.module.less';
import cn from 'classnames';
import { get } from 'lodash';
import { onFormat } from '@/utils';
export const blockInfo = [
  { icon: <BlockIcon />, text: 'number Blocks left', dataArr: ['progress', 'blocks_left'] },
  { icon: <CapIcon />, text: 'Cap supply: number', dataArr: ['cap_supply'], isFormat: true },
  { icon: <CloseIcon />, text: 'Premine: number', dataArr: ['premine'], isFormat: true },
];
const MintRuneInfo: FC<{ dataSource?: Partial<IRuneDetailItem>; style?: CSSProperties }> = ({ dataSource, style }) => {
  return (
    <dl style={style} className={cn(styles.info, 'fontSize-12 align-items-center d-flex padding-top-49 padding-bottom-20')}>
      <dt className={cn(styles.rune, 'gap-30 d-flex flex-column justify-content-center align-items-center')}>
        <i className={cn(styles.avatar, 'border-radius-10 overflow-hidden')}>
          <img alt={dataSource?.rune || 'BOBOASDFGHJAK'} src={dataSource?.rune_logo || AvatarImg} />
        </i>
        <span className={'fontSize-14'}>{dataSource?.rune}</span>
      </dt>
      <dd className={'flex-1 d-flex flex-column gap-20 fontSize-14'}>
        <p className={'w-100 d-flex justify-content-around'}>
          {blockInfo.map((item, index) => {
            const value = get(dataSource, item.dataArr)?.toString();
            return (
              <span key={item.text + index} className={'d-flex line-height-15 gap-3 '}>
                <i className={'d-flex'}>{item.icon}</i>
                <span className={'d-flex flex-column gap-20'}>
                  <span>{item.text?.replace('number', item.isFormat ? onFormat(value) : value)}</span>
                  <span>
                    {index === 0 && `Start/End height：${dataSource?.block?.start?.toString() || '888'}~${dataSource?.block?.end?.toString() || '9999'}`}
                    {index === 1 && `Current supply: ${onFormat(dataSource?.format_supply) || '999'}`}
                  </span>
                </span>
              </span>
            );
          })}
        </p>
      </dd>
    </dl>
  );
};
export default MintRuneInfo;
