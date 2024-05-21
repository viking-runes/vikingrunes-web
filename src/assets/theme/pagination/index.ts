const paginationTheme = {
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        borderRadius: 3,
        ['&.Mui-selected']: {
          backgroundColor: 'var(--ex-primary-color)',
        },
      },
    },
  },
};
export default paginationTheme;
