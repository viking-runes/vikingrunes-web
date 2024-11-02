import config from '@/config';
import { AddressType, getAddressInfo, validate, Network } from 'bitcoin-address-validation';

export const validateBTCAddress = (address: string) => {
  const isBTC = validate(address, config.isMainnet ? Network.mainnet : Network.testnet);

  if (isBTC) {
    const addressInfo = getAddressInfo(address);

    if (addressInfo.type === AddressType.p2tr) {
      return true;
    }
  }

  return false;
};
