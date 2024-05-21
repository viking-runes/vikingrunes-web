interface ISearchToken {
  progress: { cap_times: string };
  rune: string;
  rune_id: string;
  rune_logo: string;
  symbol: string;
  premine: number;
  terms: { amount: string };
  fees_recommended: {
    low: string;
    standard: string;
    high: string;
  };
  fees: {
    estimate_network_fee_sats: string;
    estimate_network_fee: string;
    service_base_fee_sats: string;
    service_base_fee: string;
    total_sats: string;
    total: string;
    fee_rate: string;
  };
}
