import { FC, PropsWithChildren } from 'react';
interface IProps {
  border?: boolean;
  tab: [];
}
const TabCard: FC<PropsWithChildren<IProps>> = (props) => {
  const { children } = props;
  return <div className={'common-card'}>{children}</div>;
};
export default TabCard;
