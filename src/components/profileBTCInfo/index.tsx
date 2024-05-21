import { FC } from 'react';
import cn from 'classnames';
export interface IItemField {
  label?: string;
  field?: string;
}

interface IProps {
  columns: Array<Record<'fee' | 'des' | 'calc', IItemField>>;
  dataSource?: Record<string, string>;
  size?: 'lg';
}
const ProfileBTCInfo: FC<IProps> = ({ size, columns, dataSource }) => {
  return (
    <div className={cn('d-flex flex-column gap-13')}>
      {columns?.map((item, index) => {
        return (
          <div key={index + index} className={cn('fontSize-12 d-flex justify-content-between')}>
            <div className={cn({ ['fontSize-14']: size === 'lg' })}>{item?.fee?.label}</div>
            <p className={'d-flex'}>
              <span>{dataSource?.[item.des.field]} Sats</span>
              <span className={'w-5rem d-block text-align-right light-color'}>${dataSource?.[item.calc.field]}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default ProfileBTCInfo;
