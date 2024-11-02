import { Modal } from '@mui/material';
import React, { FC, useCallback, useRef, useState } from 'react';
import ModalBox from '../modalBox';
import { ControlForm, ProfileBTCInfo } from '@/components';
import { TControlFormHandler } from '@/components/form/types.ts';
import { btcColumns, listColumns, listingFormItems, orderColumns, orderMock, transferFormItems } from './columns.ts';
import services from '@/service/index.ts';
import useSignPsbt from '@/hooks/wallet/use-sign-psbt.ts';
import { useWallet } from '@/stores/wallet.ts';
import { enqueueSnackbar } from 'notistack';
import { useRune } from '@/hooks/rune/useRune.tsx';
import commaNumber from 'comma-number';
import { ProfileTab } from '@/types/index.ts';
interface IProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  modalType: string;
  data: Partial<IRuneDetailItem>;
  text?: React.ReactNode;
}
const TransferModal: FC<IProps> = ({ open, text, onClose, modalType, data, title }) => {
  const { wallet, getSignedPublicKey } = useWallet();
  const { signPsbt } = useSignPsbt();
  const formInstance = useRef<TControlFormHandler>(null);
  const updateForm = () => {
    formInstance.current?.setValue({ fee_rate: currentRate });
  };
  const { runeDetail, currentRate, setCurrentRate, feeRate } = useRune(updateForm, data?.rune_id);
  const onConfirm = useCallback(async () => {
    const result = await formInstance.current.getValidate();
    if (result.length) {
      const msg = result?.[0]?.[0];
      setErrorMsg(msg?.error);
      return;
    }
    setErrorMsg(undefined);
    const values = formInstance.current.getValue();
    transfer({ to_address: values?.to_address, amount: values?.amount, fee_rate: feeRate });
  }, [feeRate]);
  const onModalClose = () => {
    setErrorMsg(undefined);
    onClose?.();
  };
  const [errorMsg, setErrorMsg] = useState<string>(undefined);
  const isTransfer = modalType === 'Transfer';

  const transfer = async (value: { to_address: string; amount: string; fee_rate: string }) => {
    try {
      const result = await services.rune.transfer({
        rune: data?.rune_id,
        pubkey: getSignedPublicKey(),
        from: wallet.address,
        fee_rate: value?.fee_rate,
        amount: +value.amount,
        to: value.to_address,
      });

      await signPsbt(result.psbt, result.to_sign_inputs);

      enqueueSnackbar('Transfer success', {
        variant: 'success',
      });

      onModalClose();
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
    <Modal open={open} onClose={onModalClose}>
      <ModalBox errorMsg={errorMsg} disabled={!!errorMsg} text={text} data={{ ...runeDetail, subInfo: `Available: ${commaNumber(data.balance?.toString())}` }} title={title || (isTransfer ? 'Transfer' : 'Listing')} onClose={onModalClose} onConfirm={onConfirm}>
        <ControlForm
          onSatUpdate={(value) => {
            if (value !== currentRate) {
              setCurrentRate(value);
            }
          }}
          onInsertClick={(value) => {
            formInstance.current?.setValue({ [value]: data?.balance?.toString() });
          }}
          sats={runeDetail?.fees_recommended}
          ref={formInstance}
          formItems={isTransfer ? transferFormItems : modalType === ProfileTab.Stakes ? [{ type: 'sats-select', name: 'fee_rate' }] : listingFormItems}
        />
        <div className={'padding-top-10'}>
          {!(isTransfer || modalType === ProfileTab.Stakes) && (
            <div className={'padding-bottom-8 margin-bottom-12 border-bottom'}>
              <ProfileBTCInfo size={'lg'} dataSource={orderMock} columns={orderColumns} />
            </div>
          )}
          <ProfileBTCInfo
            columns={isTransfer || modalType === ProfileTab.Stakes ? btcColumns : listColumns}
            dataSource={
              runeDetail?.fees || {
                estimate_network_fee_sats: '~12173 Sats',
                estimate_network_fee: '~4.87',
                service_base_fee_sats: '4999 Sats',
                service_base_fee: '2.00',
                total_sats: '~17718 Sats',
                total: '~7.09',
              }
            }
          />
        </div>
      </ModalBox>
    </Modal>
  );
};
export default TransferModal;
