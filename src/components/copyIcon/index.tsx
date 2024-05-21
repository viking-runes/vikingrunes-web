import { FC, Fragment, MouseEvent, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import copy from 'copy-to-clipboard';
import styles from './index.module.less';
const CopyIcon: FC<{ code: string; fontSize?: string }> = ({ code, fontSize }) => {
  const [open, setOpen] = useState(false);
  const onCopy = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (code) {
      copy(code, {});
      setOpen(true);
    }
  };
  return (
    <Fragment>
      <i className={'icofont-copy cursor-pointer'} style={{ fontSize }} onClick={onCopy} />
      <Snackbar
        className={styles.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert icon={false} severity="success">
          Copied successfully!
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default CopyIcon;
