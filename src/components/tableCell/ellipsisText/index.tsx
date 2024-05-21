import { FC } from 'react';
import styles from './index.module.less';
import { Tooltip } from '@mui/material';
import commaNumber from 'comma-number';
import { onFormat } from '@/utils';
interface IProps {
  width?: string;
  fontSize?: string;
  text: string;
}
const EllipsisText: FC<IProps> = ({ width, text, fontSize }) => {
  return (
    <Tooltip title={commaNumber(text)} placement="top">
      <span style={{ width, fontSize }} className={styles['text']}>
        {onFormat(text)}
      </span>
    </Tooltip>
  );
};
export default EllipsisText;
