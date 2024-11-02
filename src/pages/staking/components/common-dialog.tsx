import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  // title: string;
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;

  title?: string;
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

export function CommonDialog({ children, open, handleClose, title = '' }: Props) {
  return (
    <BootstrapDialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#EBB94C',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
}
