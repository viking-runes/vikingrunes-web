import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { IGraphQLClaimItem, IGraphQLClaimTable } from '@/types';
import { useWallet } from '@/stores/wallet';
import useSignPsbt, { extractTransaction } from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { SimpleTableHeadCustom } from '@/components/simple-table';
import { LoadingButton } from '@mui/lab';
import services from '@/service';
import { formatBalance, formatStakeCountDown, formatStakeLockedTime, isLockedTimeExpired } from '@/utils/format';
import { PrimaryButton } from '@/components';
import config from '@/config';
import { claim } from '@/utils/stake';
import { fetchClaimTable } from '@/service/stake';
import { useNavigate } from 'react-router-dom';

export default function ClaimTable() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  console.log('🚀 ~ ClaimTable ~ loading:', loading);

  const [selectedClaimItem, setSelectedClaimItem] = useState<IGraphQLClaimItem>(undefined);

  const { wallet, getSignedPublicKey } = useWallet();

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(1);

  // const [stakeOreders, setStakeOreders] = useState<IResponseStakeOrders>(defaultResponseList);
  const [claimTable, setClaimTable] = useState<IGraphQLClaimTable>();
  const publicKey = getSignedPublicKey();

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
      // debugger;
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
  }, [page, publicKey]);

  const handleClaimConfirm = async (row) => {
    setSelectedClaimItem(row);
    try {
      const stakePsbt = await claim(row, wallet.address, getSignedPublicKey());
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
            { id: 'id', label: 'Staking', align: 'center' },
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
                <Typography fontSize={14}>{row.stake_data.asset_name.toUpperCase()}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontSize={14}>{formatBalance(row.stake_data.amount)}</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography fontSize={14}>{formatStakeLockedTime(row.stake_tx_block_time)}</Typography>
              </TableCell>

              <TableCell align="center">
                <Stack direction="column" alignItems="center">
                  <Typography fontSize={14}>{row.reward_data.rune_name}</Typography>
                  <Typography fontSize={14}>{row.reward_data.amount}</Typography>
                </Stack>
              </TableCell>

              <TableCell align="center">
                <Typography fontSize={14}>{formatStakeCountDown(row.stake_tx_block_time)}</Typography>
              </TableCell>
              {/* <TableCell align="center">
                <Typography>{row.locked_time}</Typography>
              </TableCell> */}

              <TableCell align="center">
                <PrimaryButton
                  size="md"
                  type={'default'}
                  onClick={() => {
                    navigate(config.routes.tx(row.claim_txid ? row.claim_txid : row.stake_txid));
                    // window.open(config.links.tx(row.stake_txid));
                  }}
                  text={'Click'}
                  width={'92px'}
                />
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={selectedClaimItem?.stake_txid === row.stake_txid}
                  disabled={!isLockedTimeExpired(row.locked_time) || !!row.claim_txid}
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
                    width: 92,
                    height: 40,
                  }}
                >
                  {row.claim_txid ? 'Claimed' : 'Claim'}
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
