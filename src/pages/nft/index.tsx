// import { FeeRateInfo } from '@/components/fee-rate/fee-rate-info';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FeeRateInfo } from '@/components/fee-rate';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { FeeRateSelector } from '@/components/fee-rate';
import { PrimaryButton } from '@/components';
import CountBox from '@/pages/nft/components/countBox';
import NftVideo from '@/components/nft-video';
import { useWallet } from '@/stores/wallet';
import { useSnackbar } from '@/components/snackbar';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { sendBitcoinToMint } from '@/utils/stake';
import services from '@/service';
import useSendBitcoin from '@/hooks/wallet/use-send-bitcoin';
import { defaultPagination } from '@/types';
import Countdown from 'react-countdown';

// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

const NftDetail = () => {
  const feeRate = useFeeRate();

  const { wallet } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { sendBitcoin } = useSendBitcoin();
  const mintCount = useRef(1);

  const [whitelist, setWhitelist] = useState<string[]>([]);

  const [mintLoading, setMintLoading] = useState(false);

  const [mintEnv, setMintEnv] = useState<{
    address: string;
    pubkey: string;
    ordinal_id: string;
    supply: number;
    minted: number;
  }>(null);

  const startTime = 1730764800000;

  const mintDisabled = !mintEnv || mintEnv.minted >= mintEnv.supply;
  const countDisabled = startTime >= Date.now();

  const fetchMintEnv = async () => {
    const res = await services.stake.fetchMintEnv();
    setMintEnv(res);
  };

  const fetchWhitelist = async () => {
    const res = await services.stake.fetchWhitelist();
    setWhitelist(res);
  };

  useEffect(() => {
    fetchMintEnv();

    fetchWhitelist();

    setInterval(() => {
      fetchMintEnv();
    }, 10000);
  }, []);

  const onSubmitMint = async () => {
    if (mintLoading) return;

    if (!wallet.address) {
      enqueueSnackbar('Please connect wallet first', {
        variant: 'warning',
      });
      return;
    }

    if (!whitelist.includes(wallet.address)) {
      enqueueSnackbar('You are not on the whitelist.', {
        variant: 'warning',
      });
      return;
    }

    const hasMinted = localStorage.getItem(`${wallet.address}`);

    if (hasMinted) {
      enqueueSnackbar('You have already minted', {
        variant: 'warning',
      });
      return;
    }

    const body = {
      pag: defaultPagination,
      filter: {
        to_address: wallet.address,
      },
      sort: {
        createdAt: 1,
      },
    };

    const freeMints = await services.stake.fetchFreeMints(body);

    if (freeMints.rows.length >= 1) {
      enqueueSnackbar('You have already minted', {
        variant: 'warning',
      });
      return;
    }

    try {
      console.log('🚀 ~ onSubmitMint ~ mintCount.current:', mintCount.current);

      const mintMinSendValue = 546 + 600;
      const estimatedSendValue = 546 + 300 * feeRate.getCurrentSelectedRate();
      const actualSendValue = estimatedSendValue <= mintMinSendValue ? mintMinSendValue : estimatedSendValue;

      setMintLoading(true);
      const txid = await sendBitcoin(mintEnv?.address, actualSendValue, {
        feeRate: feeRate.getCurrentSelectedRate(),
      });
      console.log('🚀 ~ txid ~ txid:', txid);
      localStorage.setItem(`${wallet.address}`, txid);

      // const psbt = await sendBitcoinToMint({
      //   fromAddress: wallet.address,
      //   toAddress: mintEnv?.address,
      //   mintCount: mintCount.current,
      //   feeRate: feeRate.getCurrentSelectedRate(),
      //   pubkey: getSignedPublicKey(),
      // });

      // const rawtx = await signPsbtWthoutBroadcast(psbt);

      // console.log('🚀 ~ onSubmitMint ~ txid:', rawtx);
      // await services.mempool.pushTx(rawtx);
      enqueueSnackbar('Mint success', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setMintLoading(false);
    }
  };

  const isEnded = mintEnv?.minted >= mintEnv?.supply;

  return (
    <Box pt={6.25} pb={14.25}>
      <Stack direction={'row'} spacing={12.75}>
        {/* left content */}
        <Stack alignItems={'center'}>
          <Box borderRadius={1.25} height={400} width={400}>
            <NftVideo />

            {/* <iframe sandbox="allow-scripts" loading="lazy" src="https://ord.opendao.dev/preview/7f9f456016ca5c500c683efa2572718a43e35a91184d1d28b09feb898199d941i0" height={400} width={400}></iframe> */}
            {/* <img src="/assets/mockImage.png" alt="" width={400} height={400} /> */}
          </Box>
          {/* <Stack sx={{ width: 282, height: 30, background: '#242738', borderRadius: 2.5, justifyContent: 'center', textAlign: 'center', fontSize: 14, mt: 1.5, mb: 5 }}>You already mint: 500</Stack> */}
          <Stack sx={{ border: '1px solid #242738', borderRadius: 1.25, width: 400, pb: 5 }}>
            <Stack sx={{ height: 64, background: '#1A1C28', justifyContent: 'center', textAlign: 'center', fontSize: 18, color: '#EBB94C' }}>Salute to all the warriors</Stack>
            <Stack sx={{ px: 1, py: 2 }} spacing={2}>
              <Typography fontSize={12}>Vikings consisted of explorers, berserkers, merchants, sailors, pirates, wizards and craftsmen, and were good at sailing.</Typography>
              <Typography fontSize={12}>Legend has it that Vikings wore horned helmets to fight and were extremely brave. From the 8th to the 11th century AD, they conquered most of the European coast.</Typography>
              <Typography fontSize={12}>We have specially created the Ordinals collection &quot;Viking Warrior&ldquo; to pay tribute to the warriors who sailed on bitcoin.</Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* right content */}

        {/* {mintEnv && ( */}
        <Stack width={'100%'}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 18, color: '#EBB94C', pb: 2 }}>Viking Warrior</Typography>
            <Typography sx={{ fontSize: 18, color: '#EBB94C', pb: 2 }}>
              {/* Countdown: <Countdown date={1730678400000} daysInHours={true} /> */}
              Countdown: <Countdown date={startTime} />
            </Typography>
          </Stack>
          {/* <Typography sx={{ fontSize: 14, pb: 3.75 }}>Quantity: {mintEnv?.supply - mintEnv?.minted} &nbsp;&nbsp; Price: Freemint</Typography> */}

          {/* free box */}
          <Stack sx={{ border: '1px solid #363944', px: 1.5, py: 1.25, borderRadius: 1.25 }} spacing={1.25}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Typography fontSize={12} px={1.75} py={0.5} sx={{ background: '#363944', borderRadius: 5 }}>
                  Whitelist
                </Typography>
                {/* <img src="/assets/lock.svg" alt="" width={16} height={16} /> */}
              </Stack>
              {/* <Typography fontSize={14}>0.0014 BTC (140000 sats)</Typography> */}
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14}>
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <Typography color={'white'} display={'inherit'}>
                  Total supply &nbsp;
                </Typography>
                <Typography display={'inherit'}>{mintEnv?.supply}</Typography>

                <Typography color={'white'} display={'inherit'}>
                  &nbsp;&nbsp; Price: Freemint
                </Typography>
              </Stack>
              <Typography fontSize={20} color={isEnded ? '#363944' : '#EBB94C'}>
                {isEnded ? 'ENDED' : 'START'}
              </Typography>
            </Stack>
          </Stack>

          <Box py={2} display={'flex'} justifyContent={'flex-end'}>
            {false && (
              <CountBox
                key={'free'}
                maxValue={mintEnv?.supply - mintEnv?.minted}
                onChange={(value) => {
                  mintCount.current = value;
                }}
              />
            )}
          </Box>
          <LinearProgress
            variant="determinate"
            value={(mintEnv?.minted / mintEnv?.supply) * 100}
            // value={40}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'white',
              '.MuiLinearProgress-bar1Determinate': {
                backgroundColor: '#EBB94C',
                borderRadius: 6,
              },
            }}
          />
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} fontSize={14} mt={1.25} mb={4}>
            <Typography>Total Mintes</Typography>
            <Typography>
              {((mintEnv?.minted / mintEnv?.supply) * 100).toFixed(2)}% {mintEnv?.minted}/{mintEnv?.supply}
            </Typography>
          </Stack>

          <Stack spacing={2.5} mb={5}>
            <FeeRateSelector polling={true} />
            <FeeRateInfo networkFee={feeRate.getCurrentSelectedRate()} serviceFee={0} discount={true} />
          </Stack>
          <PrimaryButton disabled={mintDisabled} size={'lg'} text={'Mint'} type={mintDisabled || countDisabled ? 'disabled' : 'primary'} onClick={onSubmitMint} />
        </Stack>
        {/* )} */}
      </Stack>
    </Box>
  );
};
export default NftDetail;
