import { tabsClasses } from '@mui/material';

const tabsTheme = {
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: '2rem',
        [`& .MuiTab-textColorPrimary`]: {
          fontWight: '700',
          padding: '0.6rem 1.25rem',
          minHeight: '2rem',
          fontSize: '1.125rem',
          textTransform: 'none',
        },
        [`& .${tabsClasses.indicator}`]: {
          display: 'flex',
          justifyContent: 'center',
          background: 'linear-gradient(90deg, #ebb94c, rgba(235, 185, 76, 0.5))',
        },
      },
    },
  },
};
export default tabsTheme;
