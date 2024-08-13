import { useRef } from 'react';
import { closeSnackbar, SnackbarProvider as NotistackProvider } from 'notistack';

import IconButton from '@mui/material/IconButton';

import { StyledIcon, StyledNotistack } from './styles';

import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const notistackRef = useRef(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      // TransitionComponent={isRTL ? Collapse : undefined}
      TransitionComponent={undefined}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <InfoIcon width={24} />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color="success">
            <CheckCircleIcon width={24} />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <WarningIcon width={24} />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color="error">
            <ErrorIcon width={24} />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
      action={(snackbarId) => (
        <IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.5 }}>
          <CloseIcon width={16} />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
