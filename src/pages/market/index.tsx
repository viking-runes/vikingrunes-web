import { FC, useCallback } from 'react';
import styles from './index.module.less';
import { CommonTable } from '@/components';
import { columns } from '@/pages/market/columns.tsx';
import { mockdata } from '@/pages/market/mockdata.ts';
import { useNavigate } from 'react-router-dom';
import EmptyPlaceholder from '@/components/layouts/emptyPlaceholder';

const Market: FC = () => {
  const navigate = useNavigate();
  const onNameClick = useCallback(() => {
    navigate('/market/detail');
  }, []);
  return (
    <EmptyPlaceholder text={'Market'} isEmpty={true}>
      <div className={styles.card}>
        <CommonTable columns={columns(onNameClick)} dataSource={mockdata} />
      </div>
    </EmptyPlaceholder>
  );
};
export default Market;
