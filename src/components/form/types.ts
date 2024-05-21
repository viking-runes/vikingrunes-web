import { CSSProperties } from 'react';

export type TControlFormHandler = {
  setValue: (value: Record<string, string>) => void;
  getValidate: () => Promise<Array<{ error: string }[]>>;
  validate: () => Promise<Record<string, { error: string }[]>>;
  getValue: () => Record<string, string>;
};

export type TFormItem = Partial<IFormItems> & {
  onChange?: (T: string) => void;
  value?: string;
  type?: string;
  size?: 'lg';
  onUpdate?: (T: ISearchToken) => void;
  sats?: ISearchToken['fees_recommended'];
  onInsertClick?: (key: string) => void;
};
type TRequiredRule = { required: boolean; message: string };
type TPromiseRule = () => Promise<Error | undefined>;
export type IRule = TRequiredRule | TPromiseRule;

export function isTRequiredRule(rule: IRule): rule is TRequiredRule {
  return typeof rule !== 'function';
}
export interface IFormItems {
  type: 'insert-input' | 'sats-select' | 'upload' | 'table-input' | 'etch-radio' | 'auto-input';
  label?: string;
  required?: boolean;
  name: string;
  insetBtn?: string;
  rules?: Array<IRule>;
  span?: number;
  inputProps?: { select?: 'etch'; placeholder?: string; disable?: boolean };
  labelExtra?: { style?: CSSProperties; text?: string; textType?: 'primary-button' };
}
