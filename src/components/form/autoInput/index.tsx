import { FC, useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { TFormItem } from '@/components/form/types.ts';
import { debounce, isEmpty } from 'lodash';
import { fetchSearchToken } from '@/service/etch/token.ts';
import styles from './index.module.less';
import { AvatarContent } from '@/components';
import cn from 'classnames';
const AutoInput: FC<TFormItem> = (props) => {
  const [options, setOptions] = useState<ISearchToken[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const requestValue = async (searchValue: string) => {
    setLoading(true);
    fetchSearchToken<{ runes: { items: ISearchToken[] } }>(searchValue, false).then((res) => {
      setOptions(res?.runes?.items || []);
      setLoading(false);
    });
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!options?.length && !isEmpty(props?.value)) {
      setSearchValue(props?.value);
    }
  }, [props?.value]);
  const onSearch = useCallback(
    debounce((callback) => callback(), 300),
    []
  );
  useEffect(() => {
    onSearch(() => {
      if (searchValue) {
        requestValue(searchValue);
      }
    });
  }, [searchValue]);
  return (
    <Autocomplete
      onClose={() => setOpen(false)}
      open={open}
      loading={loading}
      onOpen={() => setOpen(true)}
      disablePortal={true}
      className={styles['auto']}
      multiple={false}
      value={props?.value}
      inputValue={props?.value}
      filterOptions={(options) => options}
      freeSolo={true}
      renderOption={(optionProps, option) => {
        return (
          <div
            {...optionProps}
            className={cn('MuiAutocomplete-option', styles['option'])}
            onClick={(event) => {
              optionProps.onClick(event);
              props?.onUpdate?.(option);
            }}
          >
            <div className={'d-flex'}>
              <AvatarContent avatar={option?.rune_logo} text={option?.rune} />
            </div>
          </div>
        );
      }}
      id={props.name}
      renderInput={({ inputProps, ...rest }) => {
        return (
          <TextField
            {...rest}
            inputProps={{ ...inputProps, value: searchValue }}
            onChange={(event) => {
              setSearchValue(event.target.value as string);
            }}
          />
        );
      }}
      getOptionLabel={(option) => (option as ISearchToken).rune}
      options={Object.values(options)}
    />
  );
};
export default AutoInput;
