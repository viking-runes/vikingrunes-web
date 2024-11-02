import { atom, useAtom } from 'jotai';

const btcPriceAtom = atom(0);

export function useBtcPrice() {
  const [btcPrice, setBtcPrice] = useAtom(btcPriceAtom);

  const setPrice = (price: number) => setBtcPrice(price);

  const satToPrice = (sat: number) => (sat ? `${(sat * 1e-8 * btcPrice).toFixed(2)}` : '-');

  return {
    btcPrice,
    setPrice,
    satToPrice,
  };
}
