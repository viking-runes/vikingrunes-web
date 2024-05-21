import { CSSProperties, FC } from 'react';
import styles from './index.module.less';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface IProps {
  code: string;
  len?: number;
  style?: CSSProperties;
  isEnd?: boolean;
  hideTip?: boolean;
  type?: 'address' | 'txs-code';
}
const TransactionsCode: FC<IProps> = ({ style, hideTip, code, len = 12, isEnd, type }) => {
  const pre = code?.slice?.(0, len);
  const sub = code?.slice?.(-len);
  const navigate = useNavigate();
  const onLink = () => {
    navigate({ pathname: type === 'address' ? `/address/${code}` : `/tx/${code}` });
  };
  const child = (
    <p className={styles['transactions-code-text']} style={style} onClick={onLink}>
      {pre}...{isEnd ? '' : sub}
    </p>
  );
  return hideTip ? (
    child
  ) : (
    <Tooltip title={code} placement="top">
      {child}
    </Tooltip>
  );
};
export default TransactionsCode;
