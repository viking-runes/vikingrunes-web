import { IFormItems } from '@/components/form/types.ts';
import { IItemField } from '@/components/profileBTCInfo';

export const btcColumns: Array<Record<'fee' | 'des' | 'calc', IItemField>> = [
  {
    fee: { label: 'Estimate Network Fee' },
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
export const orderColumns: Array<Record<'fee' | 'des' | 'calc', IItemField>> = [
  {
    fee: { label: 'Order Price:' },
    des: { field: 'orderFee' },
    calc: { field: 'orderValue' },
  },
];
export const orderMock = {
  orderFee: '0.00003',
  orderValue: '~$13.87',
};
export const listColumns: Array<Record<'fee' | 'des' | 'calc', IItemField>> = [
  {
    fee: { label: 'Estimate Network Fee' },
    des: { field: 'networkFee' },
    calc: { field: 'networkValue' },
  },
  {
    fee: { label: 'Market Fee:' },
    des: { field: 'marketFee' },
    calc: { field: 'marketValue' },
  },
  {
    fee: { label: 'Final Received(EST):' },
    des: { field: 'receivedFee' },
    calc: { field: 'receivedValue' },
  },
];
export const btcMockData = {
  networkFee: '~12173',
  networkValue: '~$4.87',
  baseFee: '4999',
  marketFee: '4999',
  baseValue: '~$2.00',
  marketValue: '~$2.00',
  totalFee: '~17718',
  receivedFee: '~17718',
  receivedValue: '~$7.09',
  totalValue: '~$7.09',
};
export const listingFormItems: IFormItems[] = [
  {
    type: 'insert-input',
    label: 'Amount',
    name: 'amount',
    insetBtn: 'Max',
    required: true,
    rules: [{ required: true, message: 'Please input your amount!' }],
  },
  {
    type: 'insert-input',
    label: 'Unit Price',
    name: 'price',
    required: true,
    rules: [{ required: true, message: 'Please input your unit price!' }],
  },
];
export const transferFormItems: IFormItems[] = [
  {
    type: 'insert-input',
    label: 'Amount',
    name: 'amount',
    insetBtn: 'Max',
    required: true,
    rules: [{ required: true, message: 'Please input your Amount!' }],
  },
  {
    type: 'insert-input',
    label: 'Receive',
    name: 'to_address',
    required: true,
    rules: [{ required: true, message: 'Please input your Receive!' }],
  },
  { type: 'sats-select', name: 'fee_rate' },
];
