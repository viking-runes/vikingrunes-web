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
      //   {
      //     "uuid": "3866b7a4-1937-4a5e-a1bc-f2ac6fddc9d8",
      //     "pool_id": "f0823278-a78c-4f13-821e-a1445c8220d2",
      //     "batch": "P-20240601-03",
      //     "ts_value": 1723129200,
      //     "status": "locked",
      //     "message": "",
      //     "psbt": "70736274ff01005e02000000012c927289d684d9c54cb6092aec26bf1d655f0d756c2ae34926e1290cd7ba29410000000000ffffffff0110270000000000002251204b076cde03c8636c0bf0d3f761fcc558edba9f77ae316cecf46b52a8d8a297ce70ddb4660001012b80969800000000002251207ccbe12f60f803324be373312b304578ec47d392561a4bbd1284cd96bc55b8f601084301417dbce9713ebe0bae00630f41be2d8840bef802d44146e0552af559dea6e707cc937abc07ee1fbc8b8fa0674de375718836c852f726dc5ac13a44414ac378269e830000",
      //     "network_fee": 200,
      //     "staker_pubkey": "0316163d20115c917833f68e02bb6a16329368f90c36cbc74e868834b13a57f2a2",
      //     "staker_address": "tb1p0n97ztmqlqpnyjlrwvcjkvz90rky05uj2cdyh0gjsnxed0z4hrmqwalgsf",
      //     "bind_txid": null,
      //     "bind_vout": 0,
      //     "txid": null,
      //     "createdAt": "2024-08-08T01:09:17.743Z",
      //     "updatedAt": "2024-08-08T01:25:42.720Z",
      //     "version": 0
      // }

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

      const stakePsbt = await claim(order, wallet.address, getSignedPublicKey());
      const signedStakePsbt = await signPsbtWthoutBroadcast(stakePsbt);
      await services.mempool.pushTx(signedStakePsbt);

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
