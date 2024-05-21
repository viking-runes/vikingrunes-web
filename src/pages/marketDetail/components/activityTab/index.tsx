import { FC } from 'react';
import { CommonTable } from '@/components';
import { activityColumns } from './columns.tsx';
import { activityMockdata } from './mockdata.ts';

const ActivityTab: FC = () => {
  return (
    <div>
      <CommonTable columns={activityColumns} dataSource={activityMockdata} />
    </div>
  );
};
export default ActivityTab;
