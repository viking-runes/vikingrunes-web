import { FC, Fragment, ReactNode } from 'react';
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from '@mui/material';
import DownArrowIcon from '@/assets/images/icon/downArrow.svg?react';
import styles from './index.module.less';
import cn from 'classnames';
import { GridColDef } from '@mui/x-data-grid';
import { AvatarContent, SmCopyText, TimestampTableCell, TransactionsCode } from '@/components';
import { onFormat, onFormatNumber } from '@/utils';
export interface IDataRow {
  hideable?: boolean;
  type?: 'avatar' | 'progress' | 'timestamp' | 'end-code' | 'copy' | 'comma'|'div';
  render?: (record: unknown) => ReactNode;
  columnType?: 'sort';
  dataFormat?: (text: string) => string | number;
}

interface IProps {
  columns: Array<GridColDef & IDataRow>;
  dataSource: Array<Record<string, unknown>>;
  onRow?: (row: Record<string, unknown>) => void;
  onHeadClick?: (column: GridColDef & IDataRow) => void;
  pagination?: {
    onChange: (event: React.ChangeEvent, page: number) => void;
    count: number;
    page: number;
  };
}
const CommonTable: FC<IProps> = (props) => {
  const { columns, onRow, onHeadClick, dataSource, pagination } = props;
  const matches = useMediaQuery('(max-width: 765px)');
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            {columns
              .filter((item) => !(matches && item.hideable))
              .map((item) => (
                <TableCell key={item.field} align={item.align || 'center'} onClick={() => onHeadClick?.(item)}>
                  {item.headerName}
                  {item.columnType === 'sort' && (
                    <i className={styles['sort-icon']}>
                      <DownArrowIcon />
                    </i>
                  )}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row, idx) => {
            return (
              <TableRow key={idx + idx} onClick={onRow?.bind(null, row)}>
                {columns
                  .filter((item) => !(matches && item.hideable))
                  .map((item, index) => {
                    const value = row?.[item?.field] as string;
                    const text = item?.dataFormat?.(value) || value;
                    return (
                      <TableCell align={'center'} key={item.field + index}>
                        {item.render ? (
                          item.render(row)
                        ) : text || text?.toString() === '0' ? (
                          <>
                            {item.type === 'div' && onFormat(onFormatNumber(text, row.divisibility))}
                            {item.type === 'comma' && onFormat(text?.toString())}
                            {item.type === 'avatar' && <AvatarContent type={'default'} text={text?.toString()} />}
                            {item.type === 'copy' && <SmCopyText type={'address'} code={text?.toString()} />}
                            {item.type === 'timestamp' && <TimestampTableCell text={text?.toString()} />}
                            {item.type === 'end-code' && <TransactionsCode type={'txs-code'} code={text?.toString()} isEnd={true} />}
                            {item.type === 'progress' && (
                              <p className={'d-flex flex-column justify-content-center align-items-center'}>
                                <span className={styles['progress-text']}>{text}%</span>
                                <span className={styles['progress-content']}>
                                  <LinearProgress variant="determinate" value={Number(text)} />
                                </span>
                              </p>
                            )}
                            {!item.type && row[item.field]}
                          </>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    );
                  })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className={cn(styles.pagination)}>
        <Pagination {...pagination} />
      </div>
    </Fragment>
  );
};
export default CommonTable;
