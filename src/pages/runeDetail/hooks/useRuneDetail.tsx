import { useEffect, useState } from 'react';
import { fetchRuneDetail } from '@/service/runeDetail';

export const useRuneDetail = (id?: string) => {
  const [runeDetail, setRuneDetail] = useState<IRuneDetailItem>();
  const requestRuneDetail = async (runeId: string) => {
    const { runes } = await fetchRuneDetail<{ runes: { items: IRuneDetailItem[] } }>(runeId);
    setRuneDetail(runes?.items?.[0]);
  };
  useEffect(() => {
    if (id) {
      void requestRuneDetail(id);
    }
  }, []);
  return [runeDetail];
};
