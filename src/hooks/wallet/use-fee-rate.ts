import config from '@/config';
import { getFees } from '@/service/mempool';
import { CurrentSelectedRate } from '@/types';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const feeRateAtom = atom({
  fastestFee: config.isMainnet ? 1 : 200,
  halfHourFee: config.isMainnet ? 1 : 100,
  hourFee: config.isMainnet ? 1 : 50,
  economyFee: 1,
  minimumFee: 1,
});

const currentSelectedRateAtom = atom(CurrentSelectedRate.halfHourFee);

let interval: NodeJS.Timeout | null = null;

export function useFeeRate(polling = false) {
  const [feeRate, setFeeRate] = useAtom(feeRateAtom);
  const [currentSelectedRate, setCurrentSelectedRate] = useAtom(currentSelectedRateAtom);

  const getFee = async (inited = false) => {
    const data = await getFees();
    setFeeRate(data);
    if (inited) {
      setCurrentSelectedRate(CurrentSelectedRate.halfHourFee);
    }
  };

  useEffect(() => {
    if (!polling) {
      interval && clearInterval(interval);
      return;
    }

    interval = setInterval(() => {
      getFee();
    }, 3 * 1000);

    return () => clearInterval(interval);
  }, [polling]);

  const lowFee = feeRate.hourFee;
  const standardFee = feeRate.halfHourFee;
  const highFee = feeRate.fastestFee;
  // const highFee = 30;

  const getCurrentSelectedRate = () => {
    // TODO
    // if (currentSelectedRate === CurrentSelectedRate.hourFee) return 20;
    return feeRate[currentSelectedRate];
  };

  const getNetworkFee = (vsize: number = 0) => {
    // console.log(getCurrentSelectedRate());
    return vsize * getCurrentSelectedRate();
  };

  return {
    getFee,
    feeRate,
    setFeeRate,
    lowFee,
    standardFee,
    highFee,
    getNetworkFee,
    getCurrentSelectedRate,
    setCurrentSelectedRate,
  };
}
