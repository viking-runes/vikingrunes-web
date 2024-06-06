import { useBtcPrice } from '@/components/coin-price';
import { Stack, Typography } from '@mui/material';

type Props = {
  networkFee: number;
  serviceFee: number;
};

type TypographyProps = {
  children: React.ReactNode;
};

function PrimaryTypography({ children }: TypographyProps) {
  return <Typography fontSize={12}>{children}</Typography>;
}

function SecondaryTypography({ children }: TypographyProps) {
  return (
    <Typography color="#777E91" fontSize={12}>
      {children}
    </Typography>
  );
}

export const FeeRateInfo = ({ networkFee, serviceFee }: Props) => {
  const priceHook = useBtcPrice();

  const networkFeePrice = priceHook.satToPrice(networkFee);
  const serviceFeePrice = priceHook.satToPrice(serviceFee);

  const total = networkFee + serviceFee;
  const totalPrice = priceHook.satToPrice(total);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Estimate Network Fee:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <PrimaryTypography>~{networkFee} Sats</PrimaryTypography>

          <SecondaryTypography>~${networkFeePrice}</SecondaryTypography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Service Fee:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <PrimaryTypography>~{serviceFee} Sats</PrimaryTypography>

          <SecondaryTypography>~${serviceFeePrice} </SecondaryTypography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Total:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={12}>~{total} Sats</Typography>

          <SecondaryTypography>~${totalPrice} </SecondaryTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};
