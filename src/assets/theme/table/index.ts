const tableTheme = {
  MuiTableHead: {
    styleOverrides: {
      root: {
        ['& .MuiTableCell-root']: {
          color: 'var( --ex-light-text-color)',
          borderBottomColor: 'rgba(0,0,0,0)',
          fontSize: '1rem',
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        ['& .MuiTableRow-root:hover']: {
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
        },
        ['& .MuiTableCell-root']: {
          borderBottomColor: 'rgba(34, 36, 51, 1)',
          padding: '0.5625rem',
        },
      },
    },
  },
};
export default tableTheme;
