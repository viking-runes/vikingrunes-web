import { IFormItems } from '@/components/form/types.ts';

export const mintFormItem: IFormItems[] = [
  {
    type: 'auto-input',
    span: 1,
    label: 'Rune Name',
    name: 'token',
  },
  {
    type: 'insert-input',
    span: 2,
    label: 'Amount',
    name: 'amount',
    inputProps: { disable: true },
  },
  {
    type: 'insert-input',
    span: 2,
    label: 'Symbol',
    name: 'symbol',
    inputProps: { disable: true },
  },
  {
    type: 'insert-input',
    span: 2,
    label: 'Cap times',
    name: 'cap',
    inputProps: { disable: true },
  },
  {
    type: 'insert-input',
    span: 2,
    label: 'Repeat Mint (Maximum 100)',
    name: 'mint',
    inputProps: { disable: true },
  },
  {
    type: 'sats-select',
    span: 1,
    name: 'fee_rate',
    label: 'Effective fee rate',
    labelExtra: { style: { paddingTop: '1.8rem' } },
    inputProps: { select: 'etch' },
    required: true,
    rules: [{ required: true, message: 'error message' }],
  },
];
