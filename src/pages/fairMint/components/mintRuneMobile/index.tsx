import { CSSProperties, FC } from 'react';
import { get } from 'lodash';
import { onFormat } from '@/utils';
import styles from './index.module.less';
import { blockInfo } from '@/components/mintRuneInfo';
import cn from 'classnames';

const MintRuneMobile: FC<{ dataSource?: Partial<IRuneDetailItem>; style?: CSSProperties }> = ({ dataSource }) => {
  return (
    <div className={styles['mobile-rune']}>
      <p className={'w-100 d-flex flex-column gap-20 justify-content-around'}>
        {blockInfo.map((item, index) => {
          const value = get(dataSource, item.dataArr)?.toString();
          return (
            <span key={item.text + index} className={'d-flex  flex-column gap-7'}>
              <span className={'d-flex gap-5'}>
                <i className={cn('d-flex', styles.icon)}>{item.icon}</i>
                <span className={styles.title}>{item.text?.replace('number', item.isFormat ? onFormat(value) : value || 0)}</span>
              </span>
              <span className={styles.line}>
                {index === 0 && `Start/End height：${dataSource?.block?.start?.toString() || '888'}~${dataSource?.block?.end?.toString() || '9999'}`}
                {index === 1 && `Current supply: ${onFormat(dataSource?.format_supply) || '999'}`}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
};
export default MintRuneMobile;
