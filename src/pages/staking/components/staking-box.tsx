import { Stack, StackProps } from '@mui/material';

export function StakingBox({ children, ...other }: StackProps) {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      px={{
        md: 3,
        xs: 1,
      }}
      py={{
        md: 2,
        xs: 1,
      }}
      borderRadius={1.25}
      border={'1px solid #242738'}
      bgcolor={' #1A1C28'}
      {...other}
    >
      {children}
    </Stack>
  );
}
