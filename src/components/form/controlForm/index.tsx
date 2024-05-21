import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from 'react';
import { IFormItems, TControlFormHandler } from '@/components/form/types.ts';
import FormItemInput from '@/components/form/formItemInput';
import { getValidateRule, validateRule } from '@/components/form/utils';
import FailIcon from '@/assets/images/icon/profile/fail.svg?react';
import cn from 'classnames';
import styles from './index.module.less';
import { PrimaryButton } from '@/components';
interface IProps {
  formItems: IFormItems[];
  className?: string;
  size?: 'lg';
  row?: { span?: number; gap: string };
  onLabelExtraClick?: (T: IFormItems) => void;
  onUpdate?: (T: ISearchToken) => void;
  sats?: ISearchToken['fees_recommended'];
  onSatUpdate?: (T: string) => void;
  onInsertClick?: (key: string) => void;
}

const ControlForm: ForwardRefRenderFunction<TControlFormHandler, IProps> = (props, ref) => {
  const { formItems, row, onLabelExtraClick, size } = props;
  const values = useRef<Record<string, string>>(null);
  const [, setUpdate] = useState(0);
  const [errors, setError] = useState<Record<string, { error: string }[]>>({});
  const update = () => setUpdate((pre) => ++pre);
  useImperativeHandle(ref, () => ({
    getValue: () => values?.current,
    setValue: (value) => {
      values.current = { ...(values.current || {}), ...(value || {}) };
      update();
    },
    getValidate: () => getValidateRule(formItems, values.current),
    validate: async () => {
      const error = await validateRule(formItems, values.current);
      setError(error);
      return error;
    },
  }));
  return (
    <div className={cn({ ['d-flex flex-wrap']: row?.gap })} style={{ gap: `0 ${row?.gap}` }}>
      {formItems?.map((item, index) => {
        const { labelExtra, span } = item;
        return (
          <div style={{ width: span === 1 ? '100%' : `calc((100% - ${row?.gap || 0})/${row?.span || span})` }} key={item.name + index} className={cn(styles[size], 'margin-bottom-20 d-flex flex-column gap-10', styles['form-control'])}>
            {item.label && (
              <div style={labelExtra?.style} className={cn('d-flex justify-content-between align-items-center')}>
                <p className={'fontSize-14'}>
                  {item.required && <span>*</span>}
                  <span>{item.label}</span>
                </p>
                {labelExtra && (labelExtra?.textType === 'primary-button' ? <PrimaryButton onClick={onLabelExtraClick.bind(null, item)} type={'primary'} size={'md'} text={labelExtra?.text} /> : <p>{labelExtra?.text}</p>)}
              </div>
            )}
            <FormItemInput
              size={size}
              {...item}
              onInsertClick={props?.onInsertClick}
              sats={props?.sats}
              onChange={(value) => {
                values.current = { ...(values.current || {}), [item.name]: value };
                update();
                item?.name === 'fee_rate' && props?.onSatUpdate(value);
              }}
              onUpdate={(value) => {
                props?.onUpdate(value);
              }}
              value={values.current?.[item?.name]}
            />
            {errors[item.name] && (
              <p className={cn(styles['error'], 'gap-5 d-flex justify-content-center')}>
                <i className={styles['icon']}>
                  <FailIcon />
                </i>
                <span className={'fontSize-14'}>{errors[item.name]?.[0]?.error}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default forwardRef(ControlForm);
