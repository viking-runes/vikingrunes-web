import { Stack, Typography } from '@mui/material';

type Props = {
  networkFee: number;
  serviceBaseFee: number;
  total: number;
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

export const FeeRateInfo = ({ networkFee, serviceBaseFee, total }: Props) => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Estimate Network Fee:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <PrimaryTypography>~{networkFee} Sats</PrimaryTypography>

          <SecondaryTypography>~{networkFee} Sats</SecondaryTypography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Service Base Fee:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <PrimaryTypography>~{serviceBaseFee} Sats</PrimaryTypography>

          <SecondaryTypography>~{networkFee} Sats</SecondaryTypography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <PrimaryTypography>Total:</PrimaryTypography>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={12}>~{total} Sats</Typography>

          <SecondaryTypography>~{networkFee} Sats</SecondaryTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};
