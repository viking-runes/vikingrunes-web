import { FC, Fragment, useRef } from 'react';
import styles from './index.module.less';
import { AvatarContent, ControlForm, MintRuneInfo, PrimaryButton, ProfileBTCInfo } from '@/components';
import { capProfileInfo } from '@/pages/etch/components/etchTab/columns.ts';
import { mintFormItem } from '@/pages/fairMint/columns.ts';
import { TControlFormHandler } from '@/components/form/types.ts';

import { useWallet } from '@/stores/wallet';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt';
import services from '@/service';

import { useSnackbar } from '@/components/snackbar';
import { useRune } from '@/hooks/rune/useRune.tsx';
import MintRuneMobile from '@/pages/fairMint/components/mintRuneMobile';
import cn from 'classnames';
import { useMediaQuery } from '@mui/material';

const FairMint: FC = () => {
  const { wallet, getSignedPublicKey, checkBalanceEnough } = useWallet();
  const { signPsbt } = useSignPsbt();
  const matches = useMediaQuery('(max-width: 765px)');
  const { enqueueSnackbar } = useSnackbar();

  const formInstance = useRef<TControlFormHandler>();
  const updateForm = (values: ISearchToken) => {
    const { symbol, terms, progress } = values;
    formInstance.current?.setValue({ symbol, token: values?.rune, mint: '1', cap: progress.cap_times, amount: terms?.amount, fee_rate: currentRate });
  };
  const { runeDetail, currentRate, setCurrentRate, requestDetail } = useRune(updateForm);

  const mint = async () => {
    try {
      if (!checkBalanceEnough(+runeDetail.fees.total_sats)) {
        enqueueSnackbar('Not enough BTC in wallet', {
          variant: 'error',
        });

        return;
      }

      const data = await services.rune.mint({
        rune: runeDetail?.rune_id,
        pubkey: getSignedPublicKey(),
        address: wallet.address,
        fee_rate: runeDetail.fees_recommended[currentRate],
        to_address: wallet.address,
      });

      await signPsbt(data.psbt, data.to_sign_inputs);

      enqueueSnackbar('Mint success', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      if (error?.data.message) {
        enqueueSnackbar(error?.data.message, {
          variant: 'error',
        });
      }
    }
  };

  return (
    <div className={styles.mint}>
      {runeDetail?.rune && (
        <Fragment>
          <div className={'d-media-none'}>
            <MintRuneInfo style={{ paddingBottom: '1.5rem' }} dataSource={runeDetail} />
            <span className={'divider'} />
          </div>
          <div className={cn('d-media-mobile', styles['mobile-info'])}>
            <div className={'d-flex'}>
              <AvatarContent text={runeDetail?.rune} avatar={runeDetail?.rune_logo} />
            </div>
            <MintRuneMobile dataSource={runeDetail} />
          </div>
        </Fragment>
      )}
      <div className={'padding-top-49'}>
        <ControlForm
          ref={formInstance}
          row={{ gap: matches ? '1.25rem' : '6.25rem' }}
          size={'lg'}
          onSatUpdate={(value) => {
            if (value !== currentRate) {
              setCurrentRate(value);
            }
          }}
          onUpdate={async (value) => {
            updateForm(value);
            await requestDetail(value?.rune_id);
          }}
          sats={runeDetail?.fees_recommended}
          formItems={mintFormItem}
        />
        <div className={styles['profile-info']}>
          <ProfileBTCInfo size={'lg'} columns={capProfileInfo} dataSource={runeDetail?.fees} />
        </div>
      </div>
      <PrimaryButton disabled={!runeDetail?.mintable} width={'100%'} size={'lg'} text={'Process'} type={'primary'} onClick={mint} />
    </div>
  );
};
export default FairMint;
