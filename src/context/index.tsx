import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { useWallet } from '@/stores/wallet.ts';
import { fetchPoint } from '@/service/user/points.ts';

export const ProfileContext = createContext<{ point?: string }>({ point: undefined });
export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState({ point: undefined });
  const { wallet } = useWallet();
  useEffect(() => {
    if (wallet.address) {
      fetchPoint<{ points: { value: string } }>(wallet.address).then((res) => {
        setProfile({ point: res?.points?.value });
      });
    }
  }, [wallet.address]);
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};
export default ProfileContext;
