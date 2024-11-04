'use client';

import { authAtom } from '@/state';
import { useWallet } from '@txnlab/use-wallet';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AdminAuthLoader } from './loader';

interface Props {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const pathname = usePathname();
  const setAuth = useSetRecoilState(authAtom);
  const { providers: wallets } = useWallet();

  const disconnectWallet = () => {
    for (const wallet of wallets || []) {
      wallet.disconnect();
    }

    localStorage.clear();
  };

  const checkAuth = () => {
    setLoading(true);
    const authFromStorage = localStorage.getItem('auth');

    if (!authFromStorage) {
      disconnectWallet();
      push('/admin');
      setLoading(false);
      return;
    }

    try {
      const auth = JSON.parse(authFromStorage);

      if (auth.accessToken) {
        setAuth(auth);
        setLoading(false);

        if (pathname === '/admin') {
          push('/admin/routes');
        }
      } else {
        disconnectWallet();
        push('/admin');
        setLoading(false);
      }
    } catch (error) {
      disconnectWallet();
      push('/admin');
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return loading ? <AdminAuthLoader /> : <>{children}</>;
};
