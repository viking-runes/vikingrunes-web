import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { defaultPagination, defaultResponseList, IResponseStakeOrderDetail, IResponseStakeOrders } from '@/types';
import { useWallet } from '@/stores/wallet';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { SimpleTableHeadCustom } from '@/components/simple-table';
import { LoadingButton } from '@mui/lab';
import services from '@/service';
import { formatStakeCountDown, formatStakeLockedTime } from '@/utils/format';

export default function BTCLockedTable() {
  const feeRate = useFeeRate();

  const [loading, setLoading] = useState(false);

  const [claimLoading, setClaimLoading] = useState('');

  const { wallet, getSignedPublicKey } = useWallet();

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState(defaultPagination);

  const [stakeOreders, setStakeOreders] = useState<IResponseStakeOrders>(defaultResponseList);

  const fetchOrders = async () => {
    const body = {
      pag: {
        offset: 0,
        limit: 10,
      },
      filter: {
        staker_address: wallet.address,
      },
      sort: {},
    };

    const data = await services.stake.fetchOrders(body);

    if (pagination.offset === 0) {
      setStakeOreders(data);
    } else {
      setStakeOreders((pre) => ({ ...pre, rows: [...pre.rows, ...data.rows] }));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination]);

  const handleClaimConfirm = async (uuid) => {
    setClaimLoading(uuid);
    try {
      const order: IResponseStakeOrderDetail = await services.stake.fetchOrder(uuid);
      console.log(order);
      // const networkFee = feeRate.getNetworkFee(currentSelectedPool?.network_vsize);
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
      // enqueueSnackbar('Stake success', { variant: 'success' });
      // stakeDialog.handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setClaimLoading('');
    }
  };

  return (
    <TableContainer>
      <Table>
        <SimpleTableHeadCustom
          headLabel={[
            { id: 'id', label: 'Current Locked', align: 'center' },
            { id: 'address', label: 'Locked time', align: 'center' },
            { id: 'status', label: 'Countdown', align: 'center' },
            { id: 'links', label: 'Action', align: 'center' },
          ]}
        />
        <TableBody>
          {stakeOreders.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {/* TODO: USE CORRECT FILED */}
                <Typography>{row.network_fee}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{formatStakeLockedTime(row.createdAt)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{formatStakeCountDown(row.ts_value)}</Typography>
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={row.uuid === claimLoading}
                  onClick={() => {
                    handleClaimConfirm(row.uuid);
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
      <Stack direction="row" alignItems="center" justifyContent="end" mt={2}>
        <Pagination
          count={stakeOreders.count}
          page={1}
          onChange={(event: React.ChangeEvent, page: number) => {
            setPagination((pre) => ({ ...pre, offset: (page - 1) * pre.limit }));
          }}
        />
      </Stack>
    </TableContainer>
  );
}
