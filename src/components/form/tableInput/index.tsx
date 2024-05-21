import { FC, useCallback, useRef, useState } from 'react';
import styles from './index.module.less';
import { OutlinedInput } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import cn from 'classnames';
import { PrimaryButton } from '@/components';
interface IReceiverList {
  address?: string;
  amount?: string;
}
const TableInput: FC = () => {
  const receiverList = useRef<IReceiverList[]>([{ address: undefined, amount: undefined }]);
  const [, setUpdate] = useState(0);
  const update = () => setUpdate((pre) => ++pre);
  const onAdd = () => {
    receiverList.current.push({ address: undefined, amount: undefined });
    update();
  };
  const onRemove = useCallback((index: number) => {
    receiverList.current.splice(index, 1);
    update();
  }, []);
  return (
    <div className={styles['table-input']}>
      <span className={styles.divider} />
      <div className={styles.card}>
        <ul className={'d-flex flex-column gap-12'}>
          <li className={cn(styles.head, styles.row)}>
            <span className={styles.address}>Address</span>
            <span className={styles.amount}>Amount</span>
            <div className={styles['add-button']}>
              <PrimaryButton onClick={onAdd} text={'Add'} type={'primary'} size={'md'} />
            </div>
          </li>
          {receiverList.current?.map((item, index) => {
            return (
              <li key={index + index} className={cn(styles.row)}>
                {Object.entries(item).map(([key]) => {
                  return (
                    <OutlinedInput
                      className={styles[key]}
                      key={key + index}
                      value={item[key]}
                      onChange={(event) => {
                        receiverList.current[index] = { ...(receiverList.current[index] || {}), [key]: event.target.value };
                        update();
                      }}
                      fullWidth={true}
                      id={key}
                    />
                  );
                })}
                <i className={styles.remove} onClick={onRemove.bind(null, index)}>
                  <DeleteOutlinedIcon />
                </i>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default TableInput;
