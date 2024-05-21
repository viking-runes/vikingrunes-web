import { FC, Fragment, PropsWithChildren } from 'react';
import { Skeleton } from '@mui/material';

const TableSkeleton: FC<PropsWithChildren<{ loading: boolean }>> = ({ loading, children }) => {
  return (
    <Fragment>
      {loading ? (
        <>
          <Skeleton height={50} animation={'wave'} />
          <Skeleton height={30} /> <Skeleton height={30} /> <Skeleton height={30} animation={'wave'} /> <Skeleton height={30} /> <Skeleton height={30} />
        </>
      ) : (
        children
      )}
    </Fragment>
  );
};
export default TableSkeleton;
