import { FC, useCallback } from 'react';
import { Modal } from '@mui/material';
import ModalBox from '../modalBox';
interface IProps {
  open: boolean;
  onClose: () => void;
  data: Record<string, string>;
}
const CancelModal: FC<IProps> = (props) => {
  const { open, onClose } = props;
  const onConfirm = useCallback(() => {}, []);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox title={'Cancel'} onClose={onClose} onConfirm={onConfirm}>
        <div className={'d-flex flex-column gap-14'}>
          <p>*Amount: 999</p>
          <p>*Unit Price: 111 Sat</p>
        </div>
      </ModalBox>
    </Modal>
  );
};
export default CancelModal;
