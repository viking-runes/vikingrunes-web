import { outlinedInputClasses } from '@mui/material';
const outlinedInputTheme = {
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: 'var(--ex-border-color)',
        borderWidth: '2px',
      },
      root: {
        [`& .${outlinedInputClasses.input}`]: {
          padding: '0.85rem 1.625rem',
          fontSize: '1rem',
        },
      },
    },
  },
};
export default outlinedInputTheme;
