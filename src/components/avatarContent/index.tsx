import { FC } from 'react';
import styles from './index.module.less';
import cn from 'classnames';
import { Avatar } from '@mui/material';
import RuneImg from '@/assets/images/market/avatar.png';
interface IProps {
  avatar?: string | unknown;
  text: string;
  type?: 'table' | 'default';
}
const AvatarContent: FC<IProps> = ({ avatar, type, text }) => {
  return (
    <div className={cn(styles[type], styles['avatar-content'], 'd-flex align-items-center justify-content-center')}>
      {(type === 'default' || avatar) && (
        <Avatar variant="rounded">
          <img style={{ width: '2.5625rem' }} src={(avatar as string) || RuneImg} alt={text} />
        </Avatar>
      )}
      <span>{text}</span>
    </div>
  );
};
export default AvatarContent;
