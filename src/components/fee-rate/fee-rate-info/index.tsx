import { useBtcPrice } from '@/components/coin-price';
import { Stack, Typography } from '@mui/material';

type Props = {
  networkFee: number;
  serviceFee: number;
  discount?: boolean;
};

export const FeeRateInfo = ({ networkFee, serviceFee, discount = false }: Props) => {
  const priceHook = useBtcPrice();

  const networkFeePrice = priceHook.satToPrice(networkFee);
  const serviceFeePrice = priceHook.satToPrice(serviceFee);

  const total = networkFee + serviceFee;
  const totalPrice = priceHook.satToPrice(total);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography fontSize={12}>Estimate Network Fee:</Typography>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={12}>~{networkFee} Sats</Typography>

          <Typography color="#777E91" fontSize={12}>
            ~${networkFeePrice}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ textDecoration: discount ? 'line-through' : 'auto', textDecorationColor: discount ? '#EBB94C' : 'auto' }}>
        <Typography fontSize={12}>Service Fee:</Typography>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={12}>~{serviceFee} Sats</Typography>

          <Typography color="#777E91" fontSize={12}>
            ~${serviceFeePrice}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography fontSize={12}>Total:</Typography>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={12}>~{total} Sats</Typography>

          <Typography color="#777E91" fontSize={12}>
            ~${totalPrice}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
