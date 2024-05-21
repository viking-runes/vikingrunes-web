import { createTheme, outlinedInputClasses, Theme } from '@mui/material';
export const overrideLgInputStyle = (outerTheme: Theme) =>
  createTheme({
    typography: {
      fontFamily: 'PT Mono',
    },
    palette: {
      ...outerTheme.palette,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--ex-card-border-color)',
            borderWidth: '1px',
          },
          root: {
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: '#EBB94C',
            },
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '& .MuiInputBase-input': {
              borderRadius: '0.625rem',
              position: 'relative',
              backgroundColor: '#1A1C28',
              fontSize: '0.875rem',
              width: '100%',
              padding: '1.125rem 1.25rem',
              '&:focus': {
                borderColor: '#EBB94C',
              },
            },
          },
        },
      },
    },
  });
const overrideInputStyle = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--ex-light-text-color)',
            borderWidth: '1px',
          },
          root: {
            [`& .${outlinedInputClasses.input}`]: {
              padding: '0.5rem 0.625rem',
              fontSize: '1rem',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--ex-primary-color)',
              borderWidth: '1px',
            },
          },
        },
      },
    },
  });
export default overrideInputStyle;
