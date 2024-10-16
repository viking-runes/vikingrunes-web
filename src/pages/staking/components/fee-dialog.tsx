import { CommonDialog } from '@/pages/staking/components';
import { FeeRateInfo } from '@/components/fee-rate';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { FeeRateSelector } from '@/components/fee-rate';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

type Props = {
  handleClose: () => void;
  open: boolean;
  onConfirm: () => void;
  networkVSize: number;
};

export const FeeDialog = ({ networkVSize = 1, open, handleClose, onConfirm }: Props) => {
  const feeRate = useFeeRate(true);

  const networkFee = feeRate.getNetworkFee(networkVSize);

  return (
    <CommonDialog open={open} handleClose={handleClose} title="Choose fee rate">
      <FeeRateSelector polling={true} />
      <Box mt={2}>
        <FeeRateInfo networkFee={networkFee} hideServiceFee={true} discount={true} />
      </Box>
      <Box display={'flex'} alignItems="center" justifyContent={'flex-end'}>
        <LoadingButton
          variant="contained"
          sx={{
            borderRadius: 5,
            my: 2,
            // mb: 2,
            backgroundColor: '#EBB94C',
            '&:hover': {
              backgroundColor: '#EBB94C',
            },
            width: 92,
            height: 40,
          }}
          onClick={onConfirm}
        >
          Confirm
        </LoadingButton>
      </Box>
    </CommonDialog>
  );
};
