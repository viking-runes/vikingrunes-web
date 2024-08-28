// import { FeeRateInfo } from '@/components/fee-rate/fee-rate-info';
import { Box, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { FeeRateInfo } from '@/components/fee-rate';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { FeeRateSelector } from '@/components/fee-rate';
import { useDialog } from '@/hooks/use-dialog';
import { PrimaryButton } from '@/components';
import CountBox from '@/pages/nft/components/countBox';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

const NftDetail = () => {
  const feeRate = useFeeRate();
  const nftDialog = useDialog();
  const [mintDisabled, setMintDisabled] = useState(false);

  const onSubmitMint = () => {
    nftDialog.handleOpen();
  };
  return (
    <Box pt={6.25} pb={14.25}>
      <Stack direction={'row'} spacing={12.75}>
        {/* left content */}
        <Stack alignItems={'center'}>
          <Box borderRadius={1.25}>
            <img src="/assets/mockImage.png" alt="" width={400} height={400} />
          </Box>
          <Stack sx={{ width: 282, height: 30, background: '#242738', borderRadius: 2.5, justifyContent: 'center', textAlign: 'center', fontSize: 14, mt: 1.5, mb: 5 }}>You already mint: 500</Stack>
          <Stack sx={{ border: '1px solid #242738', borderRadius: 1.25, width: 400, pb: 5 }}>
            <Stack sx={{ height: 64, background: '#1A1C28', justifyContent: 'center', textAlign: 'center', fontSize: 18, color: '#EBB94C' }}>Salute to all the warriors</Stack>
            <Stack sx={{ textAlign: 'justify', px: 1, py: 2 }} spacing={2}>
              <Typography fontSize={12}>Vikings consisted of explorers, berserkers, merchants, sailors, pirates, wizards and craftsmen, and were good at sailing.</Typography>
              <Typography fontSize={12}>Legend has it that Vikings wore horned helmets to fight and were extremely brave. From the 8th to the 11th century AD, they conquered most of the European coast.</Typography>
              <Typography fontSize={12}>We have specially created the Ordinals collection &quot;Viking Warrior&ldquo; to pay tribute to the warriors who sailed on bitcoin.</Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* right content */}
        <Stack width={'100%'}>
          <Typography sx={{ fontSize: 18, color: '#EBB94C', pb: 2 }}>Viking Warrior</Typography>
          <Typography sx={{ fontSize: 14, pb: 3.75 }}>Quantity: 40,000 &nbsp;&nbsp; Price: Freemint</Typography>

          {/* free box */}
          <Stack sx={{ border: '1px solid #363944', px: 1.5, py: 1.25, borderRadius: 1.25 }} spacing={1.25}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Typography fontSize={12} px={1.75} py={0.5} sx={{ background: '#363944', borderRadius: 5 }}>
                  Free
                </Typography>
                <img src="/assets/lock.svg" alt="" width={16} height={16} />
              </Stack>
              <Typography fontSize={14}>0.0014 BTC (140000 sats)</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14}>
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <Typography color={'#363944'} display={'inherit'}>
                  Total supply
                </Typography>
                <Typography display={'inherit'}>6,000,000</Typography>
              </Stack>
              <Typography fontSize={14} color={'#363944'}>
                ENDED
              </Typography>
            </Stack>
          </Stack>

          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            <CountBox key={'free'} />
          </Box>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: '#EBB94C',
              '.MuiLinearProgress-bar1Determinate': {
                backgroundColor: 'white',
                borderRadius: 6,
              },
            }}
          />
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14} mt={1.25}>
            <Typography>Total Mintes</Typography>
            <Typography>100% (500000/600000)</Typography>
          </Stack>
          <Divider variant="fullWidth" sx={{ height: 4, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, borderColor: 'transparent', my: 4.5 }} />
          {/* free box */}
          <Stack sx={{ border: '1px solid #EBB94C', px: 1.5, py: 1.25, borderRadius: 1.25 }} spacing={1.25}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Typography fontSize={12} px={1.75} py={0.5} sx={{ background: '#EBB94C', borderRadius: 5 }}>
                  Sale
                </Typography>
                <img src="/assets/lock.svg" alt="" width={16} height={16} />
              </Stack>
              <Typography fontSize={14}>0.0014 BTC (140000 sats)</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14}>
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <Typography color={'#363944'} display={'inherit'}>
                  Total supply
                </Typography>
                <Typography display={'inherit'}>6,000,000</Typography>
              </Stack>
              <Typography fontSize={14} color={'#EBB94C'}>
                IN PROGRESS
              </Typography>
            </Stack>
          </Stack>

          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            <CountBox key={'sale'} />
          </Box>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: '#EBB94C',
              '.MuiLinearProgress-bar1Determinate': {
                backgroundColor: 'white',
                borderRadius: 6,
              },
            }}
          />
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14} mt={1.25} mb={8}>
            <Typography>Total Mintes</Typography>
            <Typography>100% (500000/600000)</Typography>
          </Stack>
          <Stack spacing={2.5} mb={5}>
            <FeeRateSelector polling={nftDialog.open} />
            <FeeRateInfo networkFee={feeRate.getNetworkFee()} serviceFee={feeRate.standardFee} />
          </Stack>
          <PrimaryButton disabled={mintDisabled} size={'lg'} text={mintDisabled ? 'ending' : 'Mint'} type={mintDisabled ? 'disabled' : 'primary'} onClick={onSubmitMint} />
        </Stack>
      </Stack>
    </Box>
  );
};
export default NftDetail;
