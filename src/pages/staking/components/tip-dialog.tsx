import { useState } from 'react';
import { Typography } from '@mui/material';
import { CommonDialog } from '@/pages/staking/components';

export const useTipDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TipDialog = () => (
    <CommonDialog open={open} handleClose={handleClose} title="Tips">
      <Typography p={2}>
        {`Don't worry, the assets are still in your address. But because the wallet has not yet adapted to the UTXO-Staking Protocol, the staked and rewarded assets are not visible in the wallet. You need to claim after the countdown ends, and the assets will be released and visible.`}
      </Typography>
    </CommonDialog>
  );

  return {
    open,
    handleOpen,
    handleClose,
    TipDialog,
  };
};
