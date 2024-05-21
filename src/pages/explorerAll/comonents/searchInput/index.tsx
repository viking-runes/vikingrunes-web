import { FC, useCallback, useEffect, useState } from 'react';
import styles from '@/pages/explorerAll/index.module.less';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { fetchAllSearch } from '@/service/explorerAll/search.ts';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { TransactionsCode } from '@/components';
interface IOption {
  keyword: string;
  scene: string;
  extend: string;
}
const SearchInput: FC = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [options, setOptions] = useState<IOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSearch = useCallback(
    debounce((callback) => callback(), 300),
    []
  );
  useEffect(() => {
    setLoading(true);
    onSearch(() => {
      fetchAllSearch<{ search: { items: IOption[] } }>(searchValue).then((res) => {
        setOptions(res?.search?.items);
        setLoading(false);
      });
    });
  }, [searchValue]);
  return (
    <div className={styles.search}>
      <Autocomplete
        loading={loading}
        freeSolo={true}
        filterOptions={(options) => options}
        renderOption={(optionProps, option) => {
          const isRune = option.scene === 'rune';
          return (
            <div
              {...optionProps}
              className={cn('MuiAutocomplete-option', styles['option'])}
              onClick={() => {
                isRune && navigate(`/${option.scene}/${option.keyword}`);
              }}
            >
              {isRune ? option?.extend : <TransactionsCode hideTip={true} style={{ color: '#fff' }} type={option.scene as 'address' | 'txs-code'} code={option.keyword} />}
            </div>
          );
        }}
        getOptionLabel={(option: IOption) => option.keyword}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                value: searchValue,
              }}
              fullWidth={true}
              onChange={(event) => {
                setSearchValue(event.target.value as string);
              }}
              value={searchValue}
              id="outlined-basic"
              placeholder={'Search by Address / Rune Name / Rune Id / Txid'}
            />
          );
        }}
        options={options}
      />
    </div>
  );
};
export default SearchInput;
