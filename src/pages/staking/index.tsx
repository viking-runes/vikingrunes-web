import { StackingBox, StakingCard, CommonDialog } from '@/pages/staking/components';
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
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CommonTable, TableSkeleton } from '@/components';

import { TProfileColumnItem } from '@/types/table';
import services from '@/service';
import { defaultPagination, defaultResponseList, IResponseStakeItem, IResponseStakePools } from '@/types';
import { useWallet } from '@/stores/wallet';
import { FeeRateSelector } from '@/components/fee-rate';
import { LoadingButton } from '@mui/lab';
import { FeeRateInfo } from '@/components/fee-rate';
import { formatBalance, formatStakeDiffDays } from '@/utils/format';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { genrate_stake_psbt } from '@/utils/stake';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { useTipDialog } from '@/pages/staking/components';

const columns: TProfileColumnItem = () => [
  // {
  //   headerName: 'Rune',
  //   field: 'rune',
  //   type: 'avatar',
  //   render: (row: any) => {
  //     return (
  //       <AlignCell width={'12rem'} onClick={() => fn(row['rune_id'])}>
  //         <AvatarContent text={row['rune']} type={'table'} avatar={row?.['rune_logo']} />
  //       </AlignCell>
  //     );
  //   },
  // },
  {
    headerName: 'Current Locked',
    field: 'Locked',
    hideable: true,
    render: (row: any) => {
      return <Typography>{row['locked']}</Typography>;
    },
  },
  {
    headerName: 'Locked time',
    field: 'time',
    hideable: true,
    render: (row: any) => {
      return <Typography>{row['time']}</Typography>;
    },
  },
  {
    headerName: 'Countdown',
    field: 'countdown',
    hideable: true,
    render: (row: any) => {
      return <Typography>{row['countdown']}</Typography>;
    },
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // change background color
  '& .MuiPaper-root': {
    backgroundColor: '#1A1C28',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    borderBottom: 'none',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    backgroundImage: 'none',
  },
}));

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
  const [currentTab, setCurrentTab] = useState(0);
  const [stakeLoading, setStakeLoading] = useState(false);

  const tipDialog = useTipDialog();
  const feeRate = useFeeRate();

  const [dataSource, setDataSource] = useState<IResponseStakePools>(defaultResponseList);
  const [loading, setLoading] = useState(false);
  // const [params, setParams] = useState({ tab: 'all', holder: true, all_in_search: '' });

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { wallet, getSignedPublicKey } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState(defaultPagination);

  const [currentSelectedPool, setCurrentSelectedPool] = useState<IResponseStakeItem>();

  const [stakeDialogOpen, setStakeDialogOpen] = useState(false);

  const handleStakeDialogOpen = () => {
    setStakeDialogOpen(true);
  };

  const handleStakeDialogClose = () => {
    setStakeDialogOpen(false);
  };

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
      setDataSource(data);
    } else {
      setDataSource((pre) => ({ ...pre, rows: [...pre.rows, ...data.rows] }));
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (wallet.address) {
      fetchPools();
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
      const stakePsbt = await genrate_stake_psbt(wallet.address, getSignedPublicKey(), currentSelectedPool, networkFee);
      const signedStakePsbt = await signPsbtWthoutBroadcast(stakePsbt);
      // const psbt = txFinalizeIdx(signedStakePsbt);

      console.log('🚀 ~ handleStakeConfirm ~ signedStakePsbt:', signedStakePsbt);

      const body = {
        pubkey: wallet.publicKey,
        psbt: signedStakePsbt,
        pool_id: currentSelectedPool.uuid,
        network_fee: networkFee,
      };

      const response = await services.stake.txStake(body);
      console.log('🚀 ~ handleStakeConfirm ~ response:', response);

      enqueueSnackbar('Stake success', { variant: 'success' });
      handleStakeDialogClose();
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
            <StackingBox mb={3}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                    Total BTC Locked
                  </Typography>
                  <Typography fontSize={responsiveTextFontSize}>{onFormat(999999999999)}</Typography>
                </Stack>

                <ResponsiveBox>
                  <img src={btcImg} width={'100%'} height={'100%'} />
                </ResponsiveBox>
              </Stack>
            </StackingBox>

            <StackingBox>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={responsiveFontSize} color={'#777E91'}>
                    $VIKING Current Locked
                  </Typography>
                  <Typography fontSize={responsiveTextFontSize}>{onFormat(999999999999)}</Typography>
                </Stack>
                <ResponsiveBox>
                  <img src={dollarImg} width={'100%'} height={'100%'} />
                </ResponsiveBox>
              </Stack>
            </StackingBox>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <StackingBox mb={3}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={14} color={'#777E91'}>
                    BTC Current Locked
                  </Typography>
                  <Typography>{onFormat(999999999999)}</Typography>
                </Stack>
                <img src={btcImg} width={40} height={40} />
              </Stack>
            </StackingBox>

            <StackingBox>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Stack spacing={1.5}>
                  <Typography fontSize={14} color={'#777E91'}>
                    $VIKING Reward Amount
                  </Typography>
                  <Typography>{onFormat(999999999999)}</Typography>
                </Stack>
                <img src={dollarImg} width={40} height={40} />
              </Stack>
            </StackingBox>
          </Grid>
        </Grid>

        <Grid item xs={7} md={5}>
          <StackingBox>
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
                      <Typography>{onFormat(999999999999)}</Typography>
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
                          handleClickOpen();
                        }}
                        fontSize={responsiveTextFontSize}
                      >
                        <Typography>{onFormat(999999999999)}</Typography>
                        <img src={nextImg} width={12} height={12} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Stack spacing={1.5}>
                      <Typography fontSize={14} color={'#777E91'}>
                        $VIKING Balance
                      </Typography>
                      <Typography>{onFormat(999999999999)}</Typography>
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
                          handleClickOpen();
                        }}
                        fontSize={responsiveTextFontSize}
                      >
                        <Typography>{onFormat(1111)}</Typography>
                        <img src={nextImg} width={12} height={12} />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </StackingBox>
        </Grid>
      </Grid>
      {/* tab */}

      <Stack spacing={2} direction={'row'} alignItems={'center'} pt={3}>
        <img src={appImg} width={22} height={22} />
        {/* <Typography variant="body2" fontSize={18} color={'#EBB94C'}>
          Your pool{' '}
        </Typography> */}
        <Tabs centered value={currentTab} onChange={handleTabChange}>
          <Tab disableRipple label="Your pool" />
          <Tab disableRipple label="BTC Staking Season 1" />
        </Tabs>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.10)' }} />

      <CustomTabPanel value={currentTab} index={0}></CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <img src={infoImg} width={12} height={12} />
          <Typography variant="body2">Basic rate of $VIKING release: 3,000 $VIKING/1 BTC/1 Day</Typography>
        </Stack>
      </CustomTabPanel>

      <Grid container spacing={3} mb={3}>
        {dataSource.rows.map((item, index) => {
          return (
            <StakingCard
              data={item}
              key={index}
              onClick={(item) => {
                setCurrentSelectedPool(item);
                handleStakeDialogOpen();
              }}
            />
          );
        })}

        {/* {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Grid item md={4} xs={12} key={index}>
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
                    <img src={poolImg} width={16} height={16} />
                    <Typography color="#EBB94C">0.05 BTC Staking Pool</Typography>
                  </Stack>

                  <Typography color={'#EBB94C'}>30 Day</Typography>
                </Stack>

                <Box p={2}>
                  <Stack direction="column" spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" alignItems="center">
                        <Typography color="#777E91">0.05 BTC Staking Pool</Typography>
                      </Stack>
                      <Typography>3*Basic</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" alignItems="center">
                        <Typography color="#777E91">Times left</Typography>
                      </Stack>
                      <Typography>3</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" alignItems="center">
                        <Typography color="#777E91">Cap staking times</Typography>
                      </Stack>
                      <Typography>200</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography color="#777E91">Reward once</Typography>

                        <Tooltip title="$VIKING/Reward once=Rate* BTC Staking Amount*Staking Day">
                          <img src={faqImg} width={12} height={12} />
                        </Tooltip>
                      </Stack>
                      <Typography>9,000 $VIKING</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" alignItems="center">
                        <Typography color="#777E91">Total supply</Typography>
                      </Stack>
                      <Typography>1,800,000 $VIKING</Typography>
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

                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 5,
                          '&:hover': {
                            backgroundColor: '#EBB94C',
                          },
                        }}
                        onClick={() => {}}
                      >
                        Start
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          );
        })} */}
      </Grid>

      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>BTC Current Locked</DialogTitle>
        <IconButton
          onClick={handleClose}
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
          <TableSkeleton loading={loading}>
            <CommonTable
              pagination={{
                onChange: (_: React.ChangeEvent, page) => {
                  if (page !== pagination.offset) {
                    setPagination((pre) => ({ ...pre, page }));
                  }
                },
                page: pagination.page,
                count: pagination?.count,
              }}
              columns={columns(() => {})}
              dataSource={dataSource.data}
            />
          </TableSkeleton>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>

      <tipDialog.TipDialog></tipDialog.TipDialog>

      {/* dialog */}
      <CommonDialog open={stakeDialogOpen} handleClose={handleStakeDialogClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Stake</DialogTitle>
        <IconButton
          onClick={handleStakeDialogClose}
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
            <FeeRateSelector polling={stakeDialogOpen} />
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
        </DialogContent>
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
