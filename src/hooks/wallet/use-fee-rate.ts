import { getFees } from '@/service/mempool';
import { CurrentSelectedRate } from '@/types';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const feeRateAtom = atom({
  fastestFee: 1,
  halfHourFee: 1,
  hourFee: 1,
  economyFee: 1,
  minimumFee: 1,
});

const currentSelectedRateAtom = atom(CurrentSelectedRate.hourFee);

export function useFeeRate(polling = true) {
  const [feeRate, setFeeRate] = useAtom(feeRateAtom);
  const [currentSelectedRate, setCurrentSelectedRate] = useAtom(currentSelectedRateAtom);

  const getFee = async (inited = false) => {
    const data = await getFees();
    setFeeRate(data);
    if (inited) {
      setCurrentSelectedRate(CurrentSelectedRate.hourFee);
    }
  };

  useEffect(() => {
    getFee(true);

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

  const getCurrentSelectedRate = () => {
    return feeRate[currentSelectedRate];
  };

  return {
    feeRate,
    setFeeRate,
    lowFee,
    standardFee,
    highFee,
    getCurrentSelectedRate,
    setCurrentSelectedRate,
  };
}
