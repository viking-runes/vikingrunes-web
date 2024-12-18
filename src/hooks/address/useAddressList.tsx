import { useEffect, useState } from 'react';
import { fetchBalanceList } from '@/service/addressDetail';
import { fetchTransferList } from '@/service/common/transferList.ts';
import { get } from 'lodash';
import { ProfileTab } from '@/types';
export const mapTabActive = (tab: string) => {
  const map = { Assets: 'balances' };
  return map[tab] || tab;
};
const useAddressList = (address: string, tab: string) => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1 });
  const [dataSource, setDataSource] = useState({ data: [], count: 0 });
  const isBalance = mapTabActive(tab) === 'balances';
  const requestAddressData = async () => {
    if (tab === ProfileTab.Stakes) {
      setDataSource({ data: [], count: 0 });
    } else {
      setLoading(true);
      const res = isBalance ? await fetchBalanceList(params.page, address) : await fetchTransferList(params.page, { tab: mapTabActive(tab), from_or_to_address: address });
      const data = get(res, [isBalance ? 'accounts' : 'runetxs', 'items']);
      const count = get(res, [isBalance ? 'accounts' : 'runetxs', 'pagination', 'page_total']);
      setLoading(false);
      setDataSource({ data, count });
    }
  };
  useEffect(() => {
    if (address && tab) {
      void requestAddressData();
    }
  }, [params, address, tab]);
  return {
    loading,
    params,
    dataSource,
    setParams,
  };
};
export default useAddressList;
