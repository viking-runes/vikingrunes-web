import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useState } from 'react';

import { defaultPagination, defaultResponseList, IResponseStakePools } from '@/types';
import { useWallet } from '@/stores/wallet';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import { useSnackbar } from '@/components/snackbar';
import { useFeeRate } from '@/hooks/wallet/use-fee-rate';
import { SimpleTableHeadCustom } from '@/components/simple-table';
import { LoadingButton } from '@mui/lab';

const MOCKDATA = {
  count: 3,
  rows: [
    {
      currentLocked: 0.1,
      lockedTime: 1,
      countdown: 1,
      status: 'active',
    },
    {
      currentLocked: 0.2,
      lockedTime: 2,
      countdown: 2,
      status: 'claimed',
    },
  ],
};

export default function BTCLockedTable() {
  const feeRate = useFeeRate();

  const [mineBtcData, setMineBtcData] = useState<IResponseStakePools>(defaultResponseList);

  const [loading, setLoading] = useState(false);

  const { signPsbtWthoutBroadcast } = useSignPsbt();

  const { wallet, getSignedPublicKey } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState(defaultPagination);

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
          {MOCKDATA.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Typography>{row.currentLocked}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{row.lockedTime}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{row.countdown}</Typography>
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={false}
                  // onClick={handleStakeConfirm}
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
          count={MOCKDATA.count}
          page={1}
          onChange={(event: React.ChangeEvent, page: number) => {
            console.log(page);
          }}
        />
      </Stack>
    </TableContainer>
  );
}
