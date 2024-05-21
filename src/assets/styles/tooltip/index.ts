import { createTheme } from '@mui/material';
import { CSSProperties } from 'react';

export const tooltipStyles = (tooltip?: CSSProperties) =>
  createTheme({
    typography: {
      fontFamily: 'PT Mono',
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: 'var(--ex-modal-bg)',
          },
          tooltip: {
            backgroundColor: 'var(--ex-modal-bg)',
            border: '1px solid var(--ex-card-border-color)',
            borderRadius: '0.625rem',
            padding: '0.8125rem 0.4375rem',
            ...tooltip,
          },
        },
      },
    },
  });
