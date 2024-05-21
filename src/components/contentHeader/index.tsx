import { FC } from 'react';
import styles from './index.module.less';
import { CopyIcon } from '@/components';
import cn from 'classnames';
interface IProps {
  headArr: Array<string>;
  copyText?: Array<string>;
  textArr?: Array<string>;
  onHeadPrimaryClick?: () => void;
  isSmHead?: boolean;
}
const ContentHeader: FC<IProps> = (props) => {
  const { headArr, isSmHead, textArr, copyText, onHeadPrimaryClick } = props;

  return (
    <div className={cn(styles['content-head-title'], ' d-flex flex-column')}>
      <h1 className={cn(styles['head-title'], 'd-flex  flex-wrap', { ['small-size-head']: isSmHead })}>
        {headArr.map((text, index) => {
          return text?.includes('zoroday') || text?.includes('zorosmall') ? (
            <a key={text + index} className={cn({ [styles['head-small']]: text?.includes('zorosmall') })} onClick={onHeadPrimaryClick}>
              {text?.replace?.('zoroday', '')?.replace?.('zorosmall', '')}
            </a>
          ) : (
            <span key={text + index}>{text}</span>
          );
        })}
      </h1>
      <p className={cn(styles['small-head'], 'd-flex align-items-center')}>{textArr?.map((t) => <span key={t}>{t}</span>)}</p>
      <p className={cn(styles['small-head'])}>
        {copyText?.map((t) => <a key={t}>{t}</a>)}
        {copyText && (
          <span className={styles.icon}>
            <CopyIcon code={copyText?.[0]} />
          </span>
        )}
      </p>
    </div>
  );
};
export default ContentHeader;
