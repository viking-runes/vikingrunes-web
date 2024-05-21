import { IFormItems, isTRequiredRule } from '@/components/form/types.ts';
import { isEmpty } from 'lodash';

export const getValidateRule = (formItems: IFormItems[], values: Record<string, string>) => {
  return new Promise<{ error: string }[][]>((resolve) => {
    const promiseList = [];
    formItems.forEach((item) => {
      item?.rules?.forEach((rule) => {
        promiseList.push(isTRequiredRule(rule) ? () => Promise.resolve(rule.required && isEmpty(values?.[item.name]) ? [{ error: rule.message }] : undefined) : rule.bind(null, values?.[item?.name]));
      });
    });
    Promise.all(promiseList.map((fn) => fn())).then((res) => {
      resolve(res?.filter(Boolean));
    });
  });
};
type TFormError = Record<string, { error: string }[]>;
export const validateRule = (formItems: IFormItems[], values: Record<string, string>) => {
  return new Promise<TFormError>((resolve) => {
    const promiseList = [];
    formItems.forEach((item) => {
      item?.rules?.forEach((rule) => {
        if (isTRequiredRule(rule)) {
          promiseList.push(() => Promise.resolve({ [item.name]: { error: rule.message } }));
        } else {
          promiseList.push(rule.bind(null, values?.[item?.name]));
        }
      });
    });
    Promise.all(promiseList.map((fn) => fn())).then((res: Array<Record<string, { error: string }>>) => {
      const result = res.reduce((pre, cur) => {
        const key = Object.keys(cur)?.[0];
        return { ...pre, [key]: [cur[key]].concat(pre[key] || []) };
      }, {});
      resolve(result as TFormError);
    });
  });
};
