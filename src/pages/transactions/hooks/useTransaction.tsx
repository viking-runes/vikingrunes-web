import { useEffect, useState } from 'react';
import { fetchTransaction } from '@/service/transactions';

export const useTransaction = (id: string) => {
  const [dataSource, setDataSource] = useState<ITransactionItem & IRuneDetailItem>();
  const requestTransaction = async () => {
    const res = await fetchTransaction<{ txs: ITransaction }>(id);
    setDataSource(res?.txs?.items?.[0] as ITransactionItem & IRuneDetailItem);
  };
  useEffect(() => {
    void requestTransaction();
  }, [id]);
  return [dataSource];
};
