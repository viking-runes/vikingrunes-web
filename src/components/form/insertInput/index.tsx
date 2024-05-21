import { FC } from 'react';
import { OutlinedInput } from '@mui/material';
import { PrimaryButton } from '@/components';
import { TFormItem } from '@/components/form/types.ts';

const InsertInput: FC<TFormItem> = ({ onChange, inputProps, onInsertClick, value, insetBtn, name, label }) => {
  return (
    <OutlinedInput
      onChange={(event) => {
        onChange?.(event?.target?.value);
      }}
      placeholder={inputProps?.placeholder}
      fullWidth={true}
      value={value}
      id={name}
      disabled={inputProps?.disable}
      endAdornment={insetBtn && <PrimaryButton onClick={onInsertClick?.bind?.(null, name)} type={'primary'} text={insetBtn} />}
      inputProps={{ 'aria-label': label }}
    />
  );
};
export default InsertInput;
