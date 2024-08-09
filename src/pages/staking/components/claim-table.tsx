import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { defaultPagination, defaultResponseList, IResponseStakeOrderDetail, IResponseStakeOrders } from '@/types';
import { useWallet } from '@/stores/wallet';
import useSignPsbt, { extractTransaction } from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { SimpleTableHeadCustom } from '@/components/simple-table';
import { LoadingButton } from '@mui/lab';
import services from '@/service';
import { formatStakeCountDown, formatStakeLockedTime } from '@/utils/format';
import { PrimaryButton } from '@/components';
import config from '@/config';
import { claim } from '@/utils/stake';

export default function ClaimTable() {
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
      pag: pagination,
      filter: {
        staker_address: wallet.address,
      },
      sort: {},
    };

    const data = await services.stake.fetchOrders(body);

    setStakeOreders(data);
    // if (pagination.offset === 0) {
    //   setStakeOreders(data);
    // } else {
    //   setStakeOreders((pre) => ({ ...pre, rows: [...pre.rows, ...data.rows] }));
    // }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination]);

  const handleClaimConfirm = async (uuid) => {
    setClaimLoading(uuid);
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

      const order: IResponseStakeOrderDetail = await services.stake.fetchOrder(uuid);

      console.log(order);

      // console.log('🚀 ~ handleClaimConfirm ~ getSignedPublicKey:', getSignedPublicKey());

      const stakePsbt = await claim(order, wallet.address, getSignedPublicKey());
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
      setClaimLoading('');
    }
  };

  return (
    <TableContainer>
      <Table>
        <SimpleTableHeadCustom
          headLabel={[
            { id: 'id', label: 'Amount', align: 'center' },
            { id: 'address', label: 'Locked time', align: 'center' },
            { id: 'status', label: 'Countdown', align: 'center' },
            { id: 'tx', label: 'Tx', align: 'center' },
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
                <PrimaryButton
                  size="md"
                  type={'default'}
                  onClick={() => {
                    window.open(config.links.tx(row.txid));
                  }}
                  text={'Click'}
                />
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
          // count={stakeOreders.count}
          count={stakeOreders.count > 0 ? Math.floor(stakeOreders.count / pagination.limit) + 1 : 1}
          page={stakeOreders.count > 0 ? Math.floor(pagination.offset / pagination.limit) + 1 : 1}
          onChange={(_: React.ChangeEvent, page: number) => {
            const offset = (page - 1) * pagination.limit;
            console.log('🚀 ~ ClaimTable ~ offset:', offset);
            setPagination((pre) => ({ ...pre, offset: offset }));
          }}
        />
      </Stack>
    </TableContainer>
  );
}
