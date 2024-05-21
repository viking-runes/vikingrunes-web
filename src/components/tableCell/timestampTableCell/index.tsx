import { FC } from 'react';
import dayjs from 'dayjs';

const TimestampTableCell: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={'d-inline-flex width-5rem text-align-left align-items-center'}>
      <p className={'timestamp-content d-flex flex-column'}>
        <span>{dayjs(Number(`${text}000`)).format('DD/MM/YYYY')}</span>
        <span>{dayjs(Number(`${text}000`)).format('HH:mm:ss')}</span>
      </p>
    </div>
  );
};
export default TimestampTableCell;
