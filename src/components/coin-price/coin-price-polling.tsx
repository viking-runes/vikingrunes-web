import { useBtcPrice } from '@/components/coin-price/coin-context';
import { useEffect } from 'react';
import redstone from 'redstone-api';

export const CoinPricePolling = () => {
  const hook = useBtcPrice();

  useEffect(() => {
    const fetchData = async () => {
      const price = await redstone.getPrice('BTC');
      hook.setPrice(price.value);
    };

    fetchData();

    const interval = setInterval(
      () => {
        fetchData();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return <></>;
};
