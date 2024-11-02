import config from '@/config';
import Axios from 'axios';

class UniSat {
  baseUrl: string;
  client: any;

  constructor() {
    this.baseUrl = config.unisatUrl;

    this.client = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        // Cookie: `_ga=GA1.1.1773726518.1685624062; cf_clearance=AxF8Ozp5RQkjdMLIsOtbX9Qod0dimo3KGOhU5pI.7A8-1704955788-0-2-fec8e11.921d4f57.58edd1f1-250.0.0; __cuid=47a729a1a4594a1e966ba3fdf53d4654; amp_fef1e8=8429d63c-7a6b-4231-a2ef-856e9808f95eR...1hp6d9h1v.1hp6da58e.4c.1.4d; _ga_3DRMVFZV3Q=GS1.1.1714920735.193.1.1714921202.0.0.0`,
        // 'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`,
        'X-Channel': 'store',
        'X-Client': 'UniSat Wallet',
        'X-Flag': '2',
        'X-Udid': 'inm6fHaXAJnh',
        'X-Version': '1.3.3',
      },
      responseType: 'json',
    });
  }

  runes_list(address) {
    return this.client.get(`/runes/list?address=${address}&cursor=0&size=100`);
  }

  address_utxo(address) {
    return this.client.get(`/address/btc-utxo?address=${address}`);
  }

  runes_utxos(address, runeid) {
    return this.client.get(`/runes/utxos?address=${address}&runeid=${runeid}`);
  }

  broadcast(tx) {
    return Axios({
      method: 'post',
      url: `${config.mempoolUrl}/api/tx`,
      data: tx,
      responseType: 'text',
    });
  }
}

export default UniSat;
