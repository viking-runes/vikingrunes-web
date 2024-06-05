import { Box, Button, DialogContent, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import poolImg from '@/assets/images/staking/pool.png';
import poolGrayImg from '@/assets/images/staking/pool-gray.png';
import faqImg from '@/assets/images/staking/faq.png';
import faqGrayImg from '@/assets/images/staking/faq-gray.png';
import { LoadingButton } from '@mui/lab';
import CommonDialog from '@/pages/staking/components/common-dialog';
import { useState } from 'react';
import { ProfileBTCInfo } from '@/components';
import { capProfileInfo } from '@/pages/etch/components/etchTab/columns';
import { etchMockData } from '@/pages/etch/components/etchTab/mockdata';
import CloseIcon from '@mui/icons-material/Close';
import { useWallet } from '@/stores/wallet';
import { genrate_stake_psbt, select_staker_utxo } from '@/utils/stake';
import { useSnackbar } from '@/components/snackbar';
import config from '@/config';
import dayjs from 'dayjs';
import { IResponseStakeItem } from '@/types';
import { formatBalance } from '@/utils/format';
import services from '@/service';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import FeeRateSelector from '@/components/fee-rate-select';

type Props = {
  data: IResponseStakeItem;
};

export default function StakingCard({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);
  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const feeRate = useFeeRate(open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const { wallet, getSignedPublicKey } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  if (!data) return null;

  const isDisabled = data.status !== 'active';
  const titleColor = isDisabled ? '#777E91' : '#EBB94C';
  const textColor = isDisabled ? '#777E91' : '#ffffff';

  const amount = formatBalance(data.amount);

  const endDate = dayjs(data.end_date);
  const beginDate = dayjs(data.begin_date);
  const diffInDays = endDate.diff(beginDate, 'day');

  // console.log(diffInDays)

  // dayjs.duration(end.diff(begin));

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
            <Typography color={titleColor}>{amount} BTC Staking Pool</Typography>
          </Stack>

          <Typography color={titleColor}>{diffInDays} Day</Typography>
        </Stack>

        <Box p={2}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">{amount} BTC Staking Pool</Typography>
              </Stack>
              <Typography color={textColor}>3*Basic</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">Times left</Typography>
              </Stack>
              <Typography color={textColor}>{data.ts_value}</Typography>
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
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center">
                <Typography color="#777E91">Total supply</Typography>
              </Stack>
              <Typography color={textColor}>{+data.runes[0].amount * data.total} $VIKING</Typography>
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
                loading={stakeLoading}
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
                onClick={async () => {
                  handleClickOpen();
                  return;
                  setStakeLoading(true);
                  try {
                    // await select_staker_utxo(wallet.address, data.amount, config.stakeServiceFee);
                    //

                    const psbt = await genrate_stake_psbt(wallet.address, getSignedPublicKey(), data.amount);
                    const signedPsbt = await signPsbtWthoutBroadcast(psbt);

                    const body = {
                      pubkey: wallet.publicKey,
                      psbt: signedPsbt,
                      pool_id: data.uuid,
                    };

                    console.log('🚀 ~ onClick={ ~ signedPsbt:', signedPsbt);

                    const response = await services.stake.txStake(body);
                    // console.log('🚀 ~ onClick={ ~ response:', response);
                  } catch (error) {
                    console.log(error);
                    enqueueSnackbar(error?.message, {
                      variant: 'error',
                    });
                  } finally {
                    setStakeLoading(false);
                  }
                }}
                // disabled={isDisabled}
                disabled={false}
              >
                {isDisabled ? 'Ending' : 'Start'}
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
        {/* dialog */}
        <CommonDialog open={open} handleClose={handleDialogClose}>
          <DialogTitle sx={{ m: 0, p: 2 }}>Stake</DialogTitle>
          <IconButton
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#EBB94C',
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Stack spacing={3} px={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography color="#777E91">Locked BTC</Typography>

                <Typography>0.05 BTC</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography color="#777E91">Locked Time</Typography>

                <Typography>30 Days</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography color="#777E91">Reward once</Typography>

                <Typography>9,000 $VIKING</Typography>
              </Stack>
              {/* <SatsSelect sats={props?.sats} selectType={inputProps?.select} onChange={onChange} value={value} /> */}
              <FeeRateSelector />
              <ProfileBTCInfo size={'lg'} columns={capProfileInfo} dataSource={etchMockData} />
            </Stack>
            <LoadingButton
              loadingPosition="start"
              size="large"
              fullWidth
              onClick={() => {}} //唤起钱包
              variant="contained"
              sx={{
                borderRadius: 1.25,
                mt: 3,
                mb: 2,
                backgroundColor: '#EBB94C',
                '&:hover': {
                  backgroundColor: '#EBB94C',
                },
              }}
            >
              Confirm
            </LoadingButton>
          </DialogContent>
        </CommonDialog>
      </Stack>
    </Grid>
  );
}