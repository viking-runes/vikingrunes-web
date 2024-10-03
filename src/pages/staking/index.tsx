import { StakingBox, StakingCard, CommonDialog } from '@/pages/staking/components';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import lockedImg from '@/assets/images/staking/locking.png';
import dollarImg from '@/assets/images/staking/dollar.png';
import btcImg from '@/assets/images/staking/btc.png';
import dashboardImg from '@/assets/images/staking/dashboard.png';
import appImg from '@/assets/images/staking/application.png';
import infoImg from '@/assets/images/staking/info.png';
import poolImg from '@/assets/images/staking/pool.png';
import faqImg from '@/assets/images/staking/faq.png';
import nextImg from '@/assets/images/staking/next.png';
import { onFormat } from '@/utils';
import { useEffect, useState } from 'react';
import { CommonTable, TableSkeleton } from '@/components';

import services from '@/service';
import { defaultPagination, defaultResponseList, IResponseStakeItem, IResponseStakePools, ProfileTab } from '@/types';
import { useWallet } from '@/stores/wallet';
import { FeeRateSelector } from '@/components/fee-rate';
import { LoadingButton } from '@mui/lab';
import { FeeRateInfo } from '@/components/fee-rate';
import { formatBalance, formatStakeDiffDays } from '@/utils/format';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { generate_stake_psbt, secondFromNow, setLocalStorageArray } from '@/utils/stake';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { useTipDialog } from '@/pages/staking/components';
import BTCLockedTable from '@/pages/staking/components/btc-locked-table';
import { useDialog } from '@/hooks/use-dialog';
import { useNavigate } from 'react-router-dom';
import { fetcStakingOverView } from '@/service/stake';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ResponsiveBox({ children }: any) {
  return (
    <Box
      height={{
        md: 40,
        xs: 16,
      }}
      width={{
        md: 40,
        xs: 16,
      }}
      minWidth={16}
    >
      {children}
    </Box>
  );
}

export default function StakingView() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [stakeLoading, setStakeLoading] = useState(false);

  const { TipDialog, ...tipDialog } = useTipDialog(
    `Don't worry, the assets are still in your address. But because the wallet has not yet adapted to the UTXO-Staking Protocol, the staked and rewarded assets are not visible in the wallet. You need to claim after the countdown ends, and the assets will be released and visible.`
  );
  const feeRate = useFeeRate();

  const [stakePoolData, setStakePoolData] = useState<IResponseStakePools>(defaultResponseList);

  const [loading, setLoading] = useState(false);
  // const [params, setParams] = useState({ tab: 'all', holder: true, all_in_search: '' });

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { wallet, getSignedPublicKey } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState(defaultPagination);

  const [currentSelectedPool, setCurrentSelectedPool] = useState<IResponseStakeItem>();

  const stakeDialog = useDialog();
  const btcCurrentLockedDialog = useDialog();

  const [stakingRes, setStakingRes] = useState({
    overview: {
      global: {
        btc_current_locked: '0',
        reward_rune_detail: {
          divisibility: 0,
          rune_id: '',
          rune_name: '',
        },
        total_btc_locked: '0',
        viking_current_locked: '0',
        viking_reward_amount: '0',
      },
      my: {
        btc_balance: '0',
        btc_current_locked: '0',
        viking_balance: '0',
        viking_current_locked: '0',
      },
    },
  });

  const fetchPools = async () => {
    const body = {
      pag: pagination,
      filter: {},
      sort: {
        begin_date: 1,
      },
    };

    // if (currentTab === 0) {
    //   body.filter['address'] = wallet.address;
    // }

    const data = await services.stake.fetchPools(body);

    if (pagination.offset === 0) {
      setStakePoolData(data);
    } else {
      setStakePoolData((pre) => ({ ...pre, rows: [...pre.rows, ...data.rows] }));
    }
  };

  const fetchOverView = async () => {
    try {
      // if (!wallet.address) return;
      setLoading(true);
      const res = await fetcStakingOverView<IOverViewData>(wallet.address, getSignedPublicKey());

      // debugger;
      // console.log('🚀 ~ fetchOverView ~ res', res.overview);
      setStakingRes(res);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (wallet.address) {
      fetchPools();
      fetchOverView();
    }
  }, [pagination?.offset, wallet.address]);

  useEffect(() => {
    feeRate.getFee(true);
  }, []);

  const responsiveFontSize = {
    md: 14,
    xs: 10,
  };
  const responsiveTextFontSize = {
    md: 16,
    xs: 12,
  };

  const handleStakeConfirm = async () => {
    setStakeLoading(true);
    try {
      const networkFee = feeRate.getNetworkFee(currentSelectedPool?.network_vsize);

      const nowSecond = secondFromNow();
      const startTime = nowSecond + 10 * 60;

      const { psbt: stakePsbt, staker_utxo } = await generate_stake_psbt(currentSelectedPool, wallet.address, getSignedPublicKey(), networkFee, startTime);
      const signedStakePsbt = await signPsbtWthoutBroadcast(stakePsbt);
      // const psbt = txFinalizeIdx(signedStakePsbt);

      console.log('🚀 ~ handleStakeConfirm ~ signedStakePsbt:', signedStakePsbt);

      const body = {
        pubkey: wallet.publicKey,
        psbt: signedStakePsbt,
        pool_id: currentSelectedPool.uuid,
        network_fee: networkFee,
        start_time: startTime,
      };

      setLocalStorageArray('locked_txids', staker_utxo.txid);

      const response = await services.stake.txStake(body);
      console.log('🚀 ~ handleStakeConfirm ~ response:', response);

      enqueueSnackbar('Stake success, tx will be received in a few minutes.', { variant: 'success' });
      stakeDialog.handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setStakeLoading(false);
    }
  };

  return (
    <>
      {/* overview */}
      <Stack spacing={2} direction={'row'} alignItems={'center'} pt={3}>
        <img src={dashboardImg} width={22} height={22} />
        <Typography variant="body2" fontSize={18} color={'#EBB94C'}>
          Staking overview
        </Typography>
      </Stack>
      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.10)' }} />
      <Grid container spacing={{ md: 3, xs: 2 }} pt={3}>
        <Grid container item xs={5} md={7} spacing={3}>
          <Grid item xs={12} md={6}>
            <StakingBox mb={3}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                    Total BTC Locked
                  </Typography>
                  <Typography fontSize={responsiveTextFontSize}>{+onFormat(formatBalance(stakingRes.overview.global.total_btc_locked))}</Typography>
                </Stack>

                <ResponsiveBox>
                  <img src={btcImg} width={'100%'} height={'100%'} />
                </ResponsiveBox>
              </Stack>
            </StakingBox>

            <StakingBox>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                    $VIKING Current Locked
                  </Typography>
                  <Typography fontSize={responsiveTextFontSize}>{onFormat(stakingRes.overview.global.viking_current_locked)}</Typography>
                  {/* <Typography fontSize={responsiveTextFontSize}>{stakingRes.overview.global.viking_current_locked}</Typography> */}
                </Stack>
                <ResponsiveBox>
                  <img src={dollarImg} width={'100%'} height={'100%'} />
                </ResponsiveBox>
              </Stack>
            </StakingBox>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <StakingBox mb={3}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={14} color={'#777E91'}>
                    BTC Current Locked
                  </Typography>
                  <Typography>{+onFormat(formatBalance(stakingRes.overview.global.btc_current_locked))}</Typography>
                  {/* <Typography>{stakingRes.overview.global.btc_current_locked}</Typography> */}
                </Stack>
                <img src={btcImg} width={40} height={40} />
              </Stack>
            </StakingBox>

            <StakingBox>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={14} color={'#777E91'}>
                    $VIKING Reward Amount
                  </Typography>
                  <Typography>{onFormat(stakingRes.overview.global.viking_reward_amount)}</Typography>
                </Stack>
                <img src={dollarImg} width={40} height={40} />
              </Stack>
            </StakingBox>
          </Grid>
        </Grid>

        <Grid item xs={7} md={5}>
          <StakingBox>
            <Stack spacing={2} height={'100%'} width={'100%'}>
              <Stack direction={'row'} alignItems={'center'} spacing={1.25}>
                <img src={lockedImg} width={16} height={16} />
                <Stack direction={'row'} alignItems={'center'} spacing={1} onClick={tipDialog.handleOpen}>
                  <Typography color={'#EBB94C'}>My staking</Typography>
                  <img src={faqImg} width={16} height={16} />
                </Stack>
              </Stack>
              <Stack px={3.25}>
                <Grid container spacing={{ md: 2.5, xs: 1 }}>
                  <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Stack spacing={1.5}>
                      <Typography fontSize={14} color={'#777E91'}>
                        BTC Balance
                      </Typography>
                      {/* <Typography>{+onFormat(formatBalance(stakingRes.overview.my.btc_balance))}</Typography> */}
                      <Typography>{stakingRes.overview.my.btc_balance}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1.5}>
                      <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                        BTC Current Locked
                      </Typography>

                      <Stack
                        spacing={0.5}
                        direction={'row'}
                        alignItems={'center'}
                        onClick={() => {
                          navigate(`/profile/MyAssets?tab=${ProfileTab.Stakes}`);
                        }}
                        fontSize={responsiveTextFontSize}
                      >
                        <Typography>{+onFormat(formatBalance(stakingRes.overview.my.btc_current_locked))}</Typography>
                        {/* <Typography>{stakingRes.overview.my.btc_current_locked}</Typography> */}
                        <img src={nextImg} width={12} height={12} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Stack spacing={1.5}>
                      <Typography fontSize={14} color={'#777E91'}>
                        $VIKING Balance
                      </Typography>
                      <Typography>{+stakingRes.overview.my.viking_balance ? onFormat(stakingRes.overview.my.viking_balance) : 0}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1.5}>
                      <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                        $VIKING Current Locked
                      </Typography>

                      <Stack
                        spacing={0.5}
                        direction={'row'}
                        alignItems={'center'}
                        onClick={() => {
                          navigate(`/profile/MyAssets?tab=${ProfileTab.Stakes}`);
                        }}
                        fontSize={responsiveTextFontSize}
                      >
                        <Typography>{onFormat(stakingRes.overview.my.viking_current_locked)}</Typography>
                        <img src={nextImg} width={12} height={12} />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </StakingBox>
        </Grid>
      </Grid>
      {/* tab */}

      <Stack spacing={2} direction={'row'} alignItems={'center'} pt={3}>
        <img src={appImg} width={22} height={22} />
        {/* <Typography variant="body2" fontSize={18} color={'#EBB94C'}>
          Your pool{' '}
        </Typography> */}
        <Tabs centered value={currentTab} onChange={handleTabChange}>
          {/* <Tab disableRipple label="Your pool" /> */}
          <Tab disableRipple label="BTC Staking Season 1" />
        </Tabs>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.10)' }} />

      {/* <CustomTabPanel value={currentTab} index={0}></CustomTabPanel> */}
      <CustomTabPanel value={currentTab} index={0}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <img src={infoImg} width={12} height={12} />
          <Typography variant="body2">Basic rate of $VIKING release: 3,000 $VIKING/1 BTC/1 Day</Typography>
        </Stack>
      </CustomTabPanel>

      <Grid container spacing={3} mb={3}>
        {stakePoolData.rows.map((item, index) => {
          return (
            <StakingCard
              data={item}
              key={index}
              onClick={(item) => {
                setCurrentSelectedPool(item);
                stakeDialog.handleOpen();
              }}
            />
          );
        })}
      </Grid>

      <CommonDialog handleClose={btcCurrentLockedDialog.handleClose} open={btcCurrentLockedDialog.open} title="BTC Current Locked">
        <BTCLockedTable />
      </CommonDialog>

      <TipDialog></TipDialog>

      {/* dialog */}
      <CommonDialog open={stakeDialog.open} handleClose={stakeDialog.handleClose} title="Stake">
        <Stack spacing={3} px={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography color="#777E91">Locked BTC</Typography>

            <Typography>{formatBalance(currentSelectedPool?.amount)} BTC</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography color="#777E91">Locked Time</Typography>

            <Typography>{formatStakeDiffDays(currentSelectedPool)} Days</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography color="#777E91">Reward once</Typography>

            <Typography>{currentSelectedPool && currentSelectedPool?.runes[0].amount} $VIKING</Typography>
          </Stack>
          {/* <SatsSelect sats={props?.sats} selectType={inputProps?.select} onChange={onChange} value={value} /> */}
          <FeeRateSelector polling={stakeDialog.open} />
          <FeeRateInfo networkFee={feeRate.getNetworkFee(currentSelectedPool?.network_vsize)} serviceFee={currentSelectedPool?.service_fee} />
        </Stack>
        <LoadingButton
          size="large"
          fullWidth
          loading={stakeLoading}
          onClick={handleStakeConfirm}
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

      {/* <Card sx={{ my: 3, p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography sx={{ wordBreak: 'break-all' }}>1233</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="div" variant="body2" noWrap>
            Subscription fee paid:
          </Typography>
        </Stack>
      </Card> */}
    </>
  );
}
