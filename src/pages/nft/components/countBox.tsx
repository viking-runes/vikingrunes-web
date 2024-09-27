import { Box, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

type CountBoxProps = {
  maxValue?: number;
  onChange?: (value: number) => void;
};

const CountBox = ({ maxValue = 600000, onChange }: CountBoxProps) => {
  const [value, setValue] = useState(1);

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = +event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const reduceFunction = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const addFunction = () => {
    if (value < maxValue) {
      const newValue = value + 1;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <InputBase
      key={value}
      type="number"
      startAdornment={
        <Box sx={{ background: '#4E5361', display: 'flex', justifyItems: 'center', alignItems: 'center', px: 1.25, py: 1, cursor: 'pointer' }} onClick={reduceFunction}>
          <RemoveIcon sx={{ color: '#777E91', fontSize: 20 }} />
        </Box>
      }
      endAdornment={
        <Box sx={{ background: '#4E5361', display: 'flex', justifyItems: 'center', alignItems: 'center', px: 1.25, py: 1, cursor: 'pointer' }} onClick={addFunction}>
          <AddIcon sx={{ color: '#777E91', fontSize: 20 }} />
        </Box>
      }
      inputProps={{ min: 1, max: maxValue }}
      value={value}
      onChange={handleValueChange}
      sx={{
        border: '1px solid #4E5361',
        '.MuiInputBase-input': { width: 60, height: 30, py: 0, textAlign: 'center' },
        '& input[type=number]': {
          '-moz-appearance': 'textfield',
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      }}
    />
  );
};
export default CountBox;
