import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components';
import { assetsColumns } from './assetsColumns.tsx';
import { mintsColumns } from './mintsColumns.tsx';
import { transfersColumns } from './transfersColumns.tsx';
import { claimColumns } from './claimColumns.tsx';

export const profileTabs = ['Assets', 'Claim', 'Mints', 'Transfers'] as const;
export type TProfileTabs = (typeof profileTabs)[number];
type TActionFun = (type: string, T: Record<string, string>) => void;
type TProfileColumns = (T: TActionFun, P: TProfileTabs) => Array<GridColDef & IDataRow>;
const columns: TProfileColumns = (fn, type) => {
  const columnsMap = {
    ['Assets']: assetsColumns,
    ['Mints']: mintsColumns,
    ['Transfers']: transfersColumns,
    ['Claim']: claimColumns,
  };
  const columnsItem = columnsMap[type];
  return typeof columnsItem === 'function' ? columnsItem(fn) : columnsItem;
};

export default columns;
