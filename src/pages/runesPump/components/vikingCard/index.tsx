import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import { mintColumn, tradeColumn } from '@/pages/runesPump/data/columns.tsx';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const VikingCard: FC<{ item: TBoardItem; type: 'Mint' | 'Trade' }> = ({ item, type }) => {
  const statusArr = ['danger', 'primary', 'default'];
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div className={cn(styles.wrapper, styles[statusArr[(item?.rank_level as number) - 1]], 'd-flex align-items-center justify-content-between')}>
      <i className={styles.img}>
        <img src={item?.rune_logo} alt={item.rune_name} />
      </i>
      <ul className={cn(styles['info'], 'd-flex flex-column gap-5')}>
        {(type === 'Mint' ? mintColumn : tradeColumn)?.map((col, index) => {
          return (
            <li key={col.name + index} className={'fontSize-12  d-flex flex-column'}>
              <p className={cn(styles[statusArr[(item?.rank_level as number) - 1]], styles.name, 'white-space-nowrap')}>{col.name}</p>
              <span className={cn(styles.value, 'white-space-nowrap')}>{col.format ? col?.format?.(item[col?.field], item) : item[col?.field]}</span>
            </li>
          );
        })}
      </ul>
      <div className={cn(styles.action, 'd-flex flex-column gap-20 justify-content-end align-items-end')}>
        <span
          onClick={() => {
            {(type === 'Mint'? navigate(`/fairMint?id=${item.rune_id}`):enqueueSnackbar('Market is not available yet !', {variant: 'info'}))}
          }}
          className={cn(styles.btn, 'fontSize-12 d-flex align-items-center justify-content-center')}
        >
          {type}
        </span>
        <span className={cn('fontSize-14', styles['text-name'], styles[statusArr[(item?.rank_level as number) - 1]])}>{item.rune_name}</span>
      </div>
    </div>
  );
};
export default VikingCard;
