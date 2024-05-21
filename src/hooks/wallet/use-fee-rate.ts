import { getFees } from '@/service/mempool';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const feeRateAtom = atom({
  fastestFee: 1,
  halfHourFee: 1,
  hourFee: 1,
  economyFee: 1,
  minimumFee: 1,
});

export function useFeeRate(polling = true) {
  const [feeRate, setFeeRate] = useAtom(feeRateAtom);

  const getFee = async () => {
    const data = await getFees();
    setFeeRate(data);
  };

  useEffect(() => {
    getFee();

    if (!polling) {
      return;
    }
    const interval = setInterval(() => {
      getFee();
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, []);

  const lowFee = feeRate.hourFee;
  const standardFee = feeRate.halfHourFee;
  const highFee = feeRate.fastestFee;

  return {
    feeRate,
    setFeeRate,
    lowFee,
    standardFee,
    highFee,
  };
}
