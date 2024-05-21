import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSearchToken } from '@/service/etch/token.ts';

export const useRune = (onUpdate?: (T: ISearchToken) => void, id?: string) => {
  const [searchParams] = useSearchParams();
  const [runeDetail, setRuneDetail] = useState<Partial<ISearchToken & IRuneDetailItem>>({});
  const [currentRate, setCurrentRate] = useState('low');
  const requestDetail = async (rune_id: string) => {
    const res = await fetchSearchToken<{ runes: { items: Array<ISearchToken & IRuneDetailItem> } }>(rune_id, true, 'low');
    setRuneDetail(res?.runes?.items?.[0]);
    return res?.runes?.items?.[0];
  };
  useEffect(() => {
    const runeid = runeDetail?.rune || searchParams.get('id') || id;
    if (runeid) {
      requestDetail(runeid).then((res) => {
        onUpdate?.(res);
      });
    }
  }, [currentRate]);

  return { setCurrentRate, currentRate, runeDetail, requestDetail, feeRate: runeDetail?.fees_recommended?.[currentRate] };
};
