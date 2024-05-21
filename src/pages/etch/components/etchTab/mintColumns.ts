import { IFormItems } from '@/components/form/types.ts';

export const mintColumns: IFormItems[] = [
  { type: 'etch-radio', span: 1, name: 'offsetSelect', rules: [{ required: true, message: 'Please input your Token!' }], required: true },
  {
    type: 'insert-input',
    name: 'startBlock',
    label: 'Start block',
    required: true,
    span: 2,
    rules: [{ required: true, message: 'error message' }],
  },
  { type: 'insert-input', span: 2, label: 'End block', name: 'endBlock', required: true, rules: [{ required: true, message: 'error message' }] },
  { type: 'insert-input', span: 2, label: 'Amount / 1 time', name: 'amount', required: true, rules: [{ required: true, message: 'error message' }] },
  { type: 'insert-input', span: 2, label: 'Cap times', name: 'cap', inputProps: { placeholder: 'Cap amount = （amount / 1 time）*cap times.' } },
  { type: 'insert-input', span: 2, label: 'Premine', name: 'premine', inputProps: { placeholder: 'Amount of tokens.' } },
  { type: 'sats-select', span: 1, label: 'Effective fee rate', inputProps: { select: 'etch' }, name: 'rate', required: true, rules: [{ required: true, message: 'error message' }] },
];
