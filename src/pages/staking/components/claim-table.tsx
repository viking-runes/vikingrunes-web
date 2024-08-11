import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { IGraphQLClaimItem, IGraphQLClaimTable, IResponseStakeOrderDetail } from '@/types';
import { useWallet } from '@/stores/wallet';
import useSignPsbt, { extractTransaction } from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { SimpleTableHeadCustom } from '@/components/simple-table';
import { LoadingButton } from '@mui/lab';
import services from '@/service';
import { formatBalance, formatStakeCountDown, formatStakeLockedTime, isLockedTimeExpired } from '@/utils/format';
import { PrimaryButton } from '@/components';
import config from '@/config';
import { claim } from '@/utils/stake';
import { fetchClaimTable } from '@/service/stake';

export default function ClaimTable() {
  const feeRate = useFeeRate();

  const [loading, setLoading] = useState(false);

  const [selectedClaimItem, setSelectedClaimItem] = useState<IGraphQLClaimItem>(undefined);

  const { wallet, getSignedPublicKey } = useWallet();

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(1);

  // const [stakeOreders, setStakeOreders] = useState<IResponseStakeOrders>(defaultResponseList);
  const [claimTable, setClaimTable] = useState<IGraphQLClaimTable>();

  // const fetchOrders = async () => {
  //   const body = {
  //     pag: pagination,
  //     filter: {
  //       staker_address: wallet.address,
  //     },
  //     sort: {},
  //   };

  //   const data = await services.stake.fetchOrders(body);

  //   setStakeOreders(data);
  //   // if (pagination.offset === 0) {
  //   //   setStakeOreders(data);
  //   // } else {
  //   //   setStakeOreders((pre) => ({ ...pre, rows: [...pre.rows, ...data.rows] }));
  //   // }
  // };

  const fetchOrders = async () => {
    try {
      const publicKey = getSignedPublicKey();
      console.log('🚀 ~ fetchOrders ~ publicKey:', publicKey);
      if (!publicKey) return;
      setLoading(true);
      const res = await fetchClaimTable<IGraphQLClaimTable>(page, publicKey);
      setClaimTable(res);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.address) {
      fetchOrders();
    }
  }, [page, wallet.address]);

  const handleClaimConfirm = async (uuid) => {
    setSelectedClaimItem(uuid);
    try {
      // const stakePsbt = await genrate_stake_psbt(wallet.address, getSignedPublicKey(), currentSelectedPool, networkFee);
      // const signedStakePsbt = await signPsbtWthoutBroadcast(stakePsbt);
      // // const psbt = txFinalizeIdx(signedStakePsbt);
      // console.log('🚀 ~ handleStakeConfirm ~ signedStakePsbt:', signedStakePsbt);
      // const body = {
      //   pubkey: wallet.publicKey,
      //   psbt: signedStakePsbt,
      //   pool_id: currentSelectedPool.uuid,
      //   network_fee: networkFee,
      // };
      // const response = await services.stake.txStake(body);
      // console.log('🚀 ~ handleStakeConfirm ~ response:', response);

      // stakeDialog.handleClose();

      // const order: IResponseStakeOrderDetail = await services.stake.fetchOrder(uuid);

      // console.log(order);

      // console.log('🚀 ~ handleClaimConfirm ~ getSignedPublicKey:', getSignedPublicKey());

      // const stakePsbt = await claim(order, wallet.address, getSignedPublicKey());
      const stakePsbt = await claim(selectedClaimItem, wallet.address, getSignedPublicKey());
      const signedStakePsbt = await signPsbtWthoutBroadcast(stakePsbt, [], {
        toSignInputs: [
          {
            index: 0,
            sighashTypes: [1],
            // publicKey: getSignedPublicKey(),
            publicKey: wallet.publicKey,
            disableTweakSigner: true,
          },
        ],
      });

      const rawtx = extractTransaction(signedStakePsbt);

      await services.mempool.pushTx(rawtx);

      enqueueSnackbar('Claim success', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setSelectedClaimItem(undefined);
    }
  };

  return (
    <TableContainer>
      <Table>
        <SimpleTableHeadCustom
          headLabel={[
            { id: 'id', label: 'Locked assets', align: 'center' },
            { id: 'address', label: 'Amount', align: 'center' },
            { id: 'status', label: 'Locked time', align: 'center' },
            { id: 'reward_data.amount', label: 'Reward', align: 'center' },
            { id: 'locked_time', label: 'Countdown', align: 'center' },
            { id: 'tx', label: 'Tx', align: 'center' },
            { id: 'links', label: 'Action', align: 'center' },
          ]}
        />
        <TableBody>
          {claimTable?.claim?.items?.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Typography>{row.stake_data.asset_name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{formatBalance(row.stake_data.amount)}</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography>{row.locked_time}</Typography>
              </TableCell>

              <TableCell align="center">
                <Stack direction="column" alignItems="center">
                  <Typography>{row.reward_data.asset_name}</Typography>
                  <Typography>{row.reward_data.amount}</Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Typography>{formatStakeLockedTime(`${row.locked_time}`)}</Typography>
              </TableCell>
              {/* <TableCell align="center">
                <Typography>{row.locked_time}</Typography>
              </TableCell> */}

              <TableCell align="center">
                <PrimaryButton
                  size="md"
                  type={'default'}
                  onClick={() => {
                    window.open(config.links.tx(row.claim_txid));
                  }}
                  text={'Click'}
                />
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={!!setSelectedClaimItem}
                  disabled={isLockedTimeExpired(row.locked_time)}
                  onClick={() => {
                    handleClaimConfirm(row);
                  }}
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    my: 2,
                    // mb: 2,
                    backgroundColor: '#EBB94C',
                    '&:hover': {
                      backgroundColor: '#EBB94C',
                    },
                  }}
                >
                  Claim
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Stack direction="row" alignItems="center" justifyContent="end" mt={2}>
        <Pagination
          // count={stakeOreders.count}
          count={stakeOreders.count > 0 ? Math.floor(stakeOreders.count / pagination.limit) + 1 : 1}
          page={stakeOreders.count > 0 ? Math.floor(pagination.offset / pagination.limit) + 1 : 1}
          onChange={(_: React.ChangeEvent, page: number) => {
            const offset = (page - 1) * pagination.limit;
            console.log('🚀 ~ ClaimTable ~ offset:', offset);
            setPagination((pre) => ({ ...pre, offset: offset }));
          }}
        />
      </Stack> */}
      <Stack direction="row" alignItems="center" justifyContent="end" mt={2}>
        <Pagination
          count={claimTable?.claim?.pagination?.page_total || 1}
          page={page}
          // count={stakeOreders.count}
          // count={stakeOreders.count > 0 ? Math.floor(stakeOreders.count / pagination.limit) + 1 : 1}
          // page={stakeOreders.count > 0 ? Math.floor(pagination.offset / pagination.limit) + 1 : 1}
          // onChange={(_: React.ChangeEvent, page: number) => {
          //   const offset = (page - 1) * pagination.limit;
          //   console.log('🚀 ~ ClaimTable ~ offset:', offset);
          //   setPagination((pre) => ({ ...pre, offset: offset }));
          // }}
          onChange={(_: React.ChangeEvent, page: number) => {
            setPage(page);
          }}
        />
      </Stack>
    </TableContainer>
  );
}
