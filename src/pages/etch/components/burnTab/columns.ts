import { IFormItems } from '@/components/form/types.ts';

export const burnColumns: IFormItems[] = [
  {
    type: 'insert-input',
    label: 'Token',
    name: 'token',
    required: true,
    rules: [{ required: true, message: 'error message' }],
  },
  {
    type: 'insert-input',
    label: 'Amount',
    name: 'amount',
    required: true,
    rules: [{ required: true, message: 'error message' }],
  },
  {
    type: 'sats-select',
    label: 'Effective fee rate',
    labelExtra: { style: { paddingTop: '1.8rem' } },
    inputProps: { select: 'etch' },
    name: 'rate',
    required: true,
    rules: [{ required: true, message: 'Please input your Token!' }],
  },
];
