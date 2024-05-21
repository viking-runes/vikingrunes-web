import { FC, Fragment } from 'react';
import { ThemeProvider, useTheme } from '@mui/material';
import overrideInputStyle, { overrideLgInputStyle } from '@/components/form/styles';
import SatsSelect from '@/components/form/satsSelect';
import { TFormItem } from '@/components/form/types.ts';
import UploadInput from '@/components/form/uploadInput';
import TableInput from '@/components/form/tableInput';
import EtchRadio from '@/components/form/etchRadio';
import InsertInput from '@/components/form/insertInput';
import AutoInput from '@/components/form/autoInput';

const FormItemInput: FC<TFormItem> = (props) => {
  const { type, inputProps, size, onChange, value } = props;
  const outerTheme = useTheme();
  return (
    <Fragment>
      <ThemeProvider theme={size === 'lg' ? overrideLgInputStyle(outerTheme) : overrideInputStyle(outerTheme)}>
        {type === 'insert-input' && <InsertInput {...props} />}
        {type === 'upload' && <UploadInput />}
        {type === 'table-input' && <TableInput />}
        {type === 'auto-input' && <AutoInput {...props} />}
      </ThemeProvider>
      {type === 'etch-radio' && <EtchRadio onChange={onChange} value={value} />}
      {type === 'sats-select' && <SatsSelect sats={props?.sats} selectType={inputProps?.select} onChange={onChange} value={value} />}
    </Fragment>
  );
};

export default FormItemInput;
