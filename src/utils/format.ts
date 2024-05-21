export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: number) => {
  if (!balance) return '';
  return (balance / 1e8).toFixed(8);
};

export function base64ToHex(str: string) {
  return atob(str)
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
