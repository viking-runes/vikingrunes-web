import { FC, useState } from 'react';
import { FormControl, OutlinedInput, useFormControl } from '@mui/material';
import styles from './index.module.less';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import cn from 'classnames';
import { createThumbnail } from '@/utils';
import { get } from 'lodash';
interface IProps {
  onChange?: (T: string) => void;
  value?: string;
}
const UploadIcon: FC = () => {
  const control = useFormControl() || {};
  return (
    <i className={cn({ [styles.focused]: get(control, 'focused') }, styles['upload-icon'])}>
      <FileUploadOutlinedIcon />
    </i>
  );
};
const UploadInput: FC<IProps> = () => {
  const [thumbnail, setThumbnail] = useState(undefined);
  return (
    <div className={styles['upload-input']}>
      <FormControl fullWidth={true}>
        <OutlinedInput
          inputProps={{ accept: 'image/*', type: 'file' }}
          onChange={async (event) => {
            const result = await createThumbnail(event.target as HTMLInputElement);
            setThumbnail(result);
          }}
          fullWidth={true}
          className={styles['upload']}
          type="file"
        />
        <UploadIcon />
        {thumbnail && (
          <i className={styles.thumbnail}>
            <img src={thumbnail} alt={'logo'} />
          </i>
        )}
      </FormControl>
    </div>
  );
};
export default UploadInput;
