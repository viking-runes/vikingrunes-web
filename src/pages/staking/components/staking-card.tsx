import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import poolImg from '@/assets/images/staking/pool.png';
import poolGrayImg from '@/assets/images/staking/pool-gray.png';
import faqImg from '@/assets/images/staking/faq.png';
import faqGrayImg from '@/assets/images/staking/faq-gray.png';
import { LoadingButton } from '@mui/lab';
import { IResponseStakeItem } from '@/types';
import { formatBalance, formatLockedTime } from '@/utils/format';

type Props = {
  data: IResponseStakeItem;
  onClick(item: IResponseStakeItem): void;
};

export function StakingCard({ data, onClick }: Props) {
  if (!data) return null;

  // const isDisabled = isLockedTimeExpired(data.ts_value);
  const isDisabled = data.status !== 'active' || data.total === data.staked_count;
  const titleColor = isDisabled ? '#777E91' : '#EBB94C';
  const textColor = isDisabled ? '#777E91' : '#ffffff';

  const amount = formatBalance(data.amount);

  // const diffInDays = formatStakeDiffDays(data);
  // const diffInHours = formatStakeDiffHours(data);
  const lockedTime = formatLockedTime(data);

  const timesLeft = data.total - data.staked_count > 0 ? data.total - data.staked_count : 0;

  return (
    <Grid item md={4} xs={12}>
      <Stack border={'1px solid #1A1C28'} borderRadius={2} direction={'column'}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            background: '#1A1C28',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <img src={isDisabled ? poolGrayImg : poolImg} width={16} height={16} />
            {/* <Typography color={titleColor}>{amount} BTC Staking Pool</Typography> */}
            <Typography color={titleColor}>{data.title}</Typography>
          </Stack>

          {/* <Typography color={titleColor}>{formatStakeDiffDays(data)} Day</Typography> */}
          <Typography color={titleColor}>{lockedTime}</Typography>
        </Stack>

        <Box p={2}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                {/* <Typography color="#777E91">{amount} BTC Staking Pool</Typography> */}
                <Typography color="#777E91">Stake once</Typography>
              </Stack>
              {/* <Typography color={textColor}>3*Basic</Typography> */}
              <Typography color={textColor}>{amount} BTC</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">Times left</Typography>
              </Stack>
              <Typography color={textColor}>{timesLeft}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">Cap staking times</Typography>
              </Stack>
              <Typography color={textColor}>{data.total}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography color="#777E91">Reward once</Typography>

                <Tooltip title="$VIKING/Reward once=Rate* BTC Staking Amount*Staking Day">
                  <img src={isDisabled ? faqGrayImg : faqImg} width={12} height={12} />
                </Tooltip>
              </Stack>
              <Typography color={textColor}>{data.runes[0].amount} $VIKING</Typography>
              {/* <Typography color={textColor}>{config.staking.rewardOnce} $VIKING</Typography> */}
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">Total supply</Typography>
              </Stack>
              <Typography color={textColor}>{(+data.runes[0].amount * data.total).toLocaleString()} $VIKING</Typography>
              {/* <Typography color={textColor}>{config.staking.rewardTotalSupply.toLocaleString()} $VIKING</Typography> */}
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  color: '#ffffff',
                  background: '#777E91',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#777E91',
                  },
                }}
              >
                RUNES
              </Button>

              <LoadingButton
                variant="contained"
                sx={{
                  borderRadius: 5,
                  '&:hover': {
                    backgroundColor: '#EBB94C',
                  },
                  '&:disabled': {
                    backgroundColor: '#777E91',
                    cursor: 'not-allowed',
                  },
                }}
                onClick={() => {
                  onClick(data);
                }}
                disabled={isDisabled}
              >
                {/* {isDisabled ? 'Ending' : 'Start'} */}
                {'Start'}
              </LoadingButton>
              {/* <LoadingButton
                loadingPosition="start"
                onClick={() => handleClickOpen()}
                variant="contained"
                sx={{
                  textTransform: 'none',
                  borderRadius: 5,
                  backgroundColor: '#1E90FF',
                  '&:hover': {
                    backgroundColor: '#1E90FF',
                  },
                }}
              >
                Split BTC
              </LoadingButton> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Grid>
  );
}
