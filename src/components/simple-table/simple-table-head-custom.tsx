import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { Theme, styled, SxProps } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

type Props = {
  headLabel: any[];
  sx?: SxProps<Theme>;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: 'transparent',
    fontSize: 14,
    // fontWeight: 500,
    // color: theme.palette.grey[600],
    color: '#777E91',
  },
  [`&.${tableCellClasses.body}`]: {},
}));

export function SimpleTableHeadCustom({ headLabel, sx }: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <StyledTableCell key={headCell.id} align={headCell.align || 'left'} sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
