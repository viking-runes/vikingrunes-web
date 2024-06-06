import { Dialog, styled } from '@mui/material';

type Props = {
  // title: string;
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // change background color
  '& .MuiPaper-root': {
    backgroundColor: '#1A1C28',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    borderBottom: 'none',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    backgroundImage: 'none',
  },
}));

export function CommonDialog({ children, open, handleClose }: Props) {
  return (
    <BootstrapDialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      {children}
    </BootstrapDialog>
  );
}
