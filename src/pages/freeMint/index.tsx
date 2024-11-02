import { Box, Button, Divider, Grid, InputAdornment, InputBase, Stack, Tooltip, Typography } from '@mui/material';
import searchImg from '@/assets/images/freemint/search.png';
import avatarImg from '@/assets/images/freemint/avatar.png';
import boxBgImg from '@/assets/images/freemint/box-bg.png';
import faqImg from '@/assets/images/staking/faq.png';
import { useCallback, useState } from 'react';
import { CommonDialog, useTipDialog } from '@/pages/staking/components';
import { PrimaryButton } from '@/components';
import { LoadingButton } from '@mui/lab';
import { FeeRateSelector } from '@/components/fee-rate';
import { FeeRateInfo } from '@/components/fee-rate';
import { useDialog } from '@/hooks/use-dialog';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';

export default function FreeMintView() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
    console.log('==setSearchQuery==', event.target.value);
  }, []);

  const clickSearch = () => {
    // todo  click search
    console.log('==clickSearch==', searchQuery);
  };

  const { TipDialog, ...tipDialog } = useTipDialog(`The address does not have permissions！`);
  const onSubmitMint = () => {
    // TODO address should freemint
    if (searchQuery) {
      tipDialog.handleOpen();
    }

    mintDialog.handleOpen();
  };
  const onSubmitClaim = () => {
    console.log('==onSubmitClaim==');
  };
  const mintDialog = useDialog();
  const feeRate = useFeeRate();
  const mintDisabled = false;
  return (
    <>
      <Stack spacing={4} alignItems={'center'} pt={{ md: 7.5, xs: 3 }} pb={5} maxWidth={'sm'} margin={'0 auto'}>
        <Typography variant="body2" fontSize={18} textAlign={'justify'}>
          New freemint paradigm, built on the Bitcoin Native Staking Service Network.
        </Typography>
        {/* search */}
        <Box sx={{ pl: 2, py: 1.5, border: `solid 2px #989EB3`, borderRadius: 2.5, width: 'calc(100% - 16px)' }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search by Address"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ py: -2 }}
            endAdornment={
              <InputAdornment position="start">
                <Button onClick={clickSearch} variant="contained" color="primary" sx={{ height: 40, width: 40, borderRadius: 2.5, bgcolor: 'rgba(119, 126, 145, 0.20)', '&:hover': { bgcolor: 'rgba(119, 126, 145, 0.20)' } }}>
                  <img src={searchImg} width={14} height={14} />
                </Button>
              </InputAdornment>
            }
          />
        </Box>

        {/* freemint pool */}
        <Grid container sx={{ py: 4, px: 5, alignItems: 'center', backgroundImage: `url(${boxBgImg})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
          <Grid item md={3} xs={12}>
            <Stack spacing={2} direction={{ md: 'column', xs: 'row' }}>
              <img src={avatarImg} width={80} height={80} />
              <Typography variant="body2" color={'#EBB94C'}>
                IDClub OG
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={7} xs={12}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Cap mint times</Typography>
                </Stack>
                <Typography color="white">200</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Times left</Typography>
                </Stack>
                <Typography color="white">3</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Reward once</Typography>
                </Stack>
                <Typography color="white">9,000 $VIKING</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Locked time</Typography>
                </Stack>
                <Typography color="white">5 days</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12} position={'relative'}>
            <Stack direction={'row'} justifyContent={'end'} position={'absolute'} right={'-50px'} top={'-10px'}>
              {/* todo mintDisabled :  Times left == 0*/}
              <PrimaryButton disabled={mintDisabled} width={'80px'} size={'md'} text={mintDisabled ? 'ending' : 'Mint'} type={mintDisabled ? 'disabled' : 'primary'} onClick={onSubmitMint} />
            </Stack>
          </Grid>
        </Grid>

        {/* openDialog */}
        <TipDialog></TipDialog>

        <CommonDialog open={mintDialog.open} handleClose={mintDialog.handleClose} title="Mint">
          <Stack spacing={3} px={2}>
            <Typography variant="body2">Effective fee rate</Typography>
            <FeeRateSelector polling={mintDialog.open} />
            <FeeRateInfo networkFee={feeRate.getNetworkFee()} serviceFee={feeRate.standardFee} discount={true} />
          </Stack>
          <LoadingButton
            size="large"
            fullWidth
            // loading={stakeLoading}
            // onClick={handleStakeConfirm}
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
        </CommonDialog>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.10)', width: 'calc(92vw)', height: '1px' }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="body2" fontSize={20} color={'#EBB94C'}>
            Your Mint
          </Typography>
          <Tooltip title="You can claim after the locked time ends.">
            <img src={faqImg} width={10} height={10} />
          </Tooltip>
        </Stack>
        {/* your mint */}
        <Grid container sx={{ py: 4, px: 5, alignItems: 'center', backgroundImage: `url(${boxBgImg})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
          <Grid item md={3} xs={12}>
            <Stack spacing={2} direction={{ md: 'column', xs: 'row' }}>
              <img src={avatarImg} width={80} height={80} />
              <Typography variant="body2" color={'#EBB94C'}>
                IDClub OG
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={7} xs={12}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Cap mint times</Typography>
                </Stack>
                <Typography color="white">200</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Times left</Typography>
                </Stack>
                <Typography color="white">3</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Reward once</Typography>
                </Stack>
                <Typography color="white">9,000 $VIKING</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <Typography color="#777E91">Locked time</Typography>
                </Stack>
                <Typography color="white">5 days</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12} position={'relative'}>
            <Stack direction={'row'} justifyContent={'end'} position={'absolute'} right={'-50px'} top={'-10px'}>
              {/* disabled={disable} onClick={onSubmit}  */}
              <PrimaryButton width={'80px'} size={'md'} text={'Claim'} type={'grey'} onClick={onSubmitClaim} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
