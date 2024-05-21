import { IFormItems } from '@/components/form/types.ts';
import { IItemField } from '@/components/profileBTCInfo';
export const capProfileInfo: Array<Record<'fee' | 'des' | 'calc', IItemField>> = [
  {
    fee: { label: 'Estimate Network Fee:' },
    des: { field: 'estimate_network_fee_sats' },
    calc: { field: 'estimate_network_fee' },
  },
  {
    fee: { label: 'Service Base Fee:' },
    des: { field: 'service_base_fee_sats' },
    calc: { field: 'service_base_fee' },
  },
  {
    fee: { label: 'Total:' },
    des: { field: 'total_sats' },
    calc: { field: 'total' },
  },
];
export const totalSupplyFormItems: IFormItems[] = [
  {
    type: 'insert-input',
    label: 'Total Supply',
    name: 'supply',
    required: true,
    rules: [{ required: true, message: 'Please input your Token!' }],
  },
  {
    type: 'table-input',
    label: 'Receiver',
    labelExtra: { text: 'Submit form', textType: 'primary-button' },
    name: 'receiver',
    required: true,
    rules: [{ required: true, message: 'Please input your Token!' }],
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
export const etchFormItems: IFormItems[] = [
  {
    type: 'insert-input',
    label: 'Token',
    name: 'token',
    required: true,
    rules: [{ required: true, message: 'Please input your Token!' }],
  },
  {
    type: 'insert-input',
    label: 'Symbol',
    name: 'symbol',
    required: true,
    rules: [{ required: true, message: 'Please input your Symbol!' }],
  },
  {
    type: 'insert-input',
    label: 'Decimals',
    name: 'decimals',
    required: true,
    rules: [{ required: true, message: 'Please input your Decimals!' }],
  },
];
