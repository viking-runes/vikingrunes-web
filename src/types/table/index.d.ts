import { GridColDef } from '@mui/x-data-grid';
import { IDataRow } from '@/components';

export type TProfileColumnItem = (T: TActionFun) => Array<GridColDef & IDataRow>;
