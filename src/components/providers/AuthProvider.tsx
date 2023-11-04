'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import userStore from '@/store/store';
import { $api } from '@/service/http';
import { of } from 'rxjs';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoggedIn, isLoading, isActivated, checkAuth, login, logout, setUser, setIsLoading, setIsLoggedIn } =
    userStore();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const users = JSON.parse(localStorage.getItem('user') || '{}') || {};
    const at = JSON.parse(localStorage.getItem('access_token') || '{}');
    const rf = JSON.parse(localStorage.getItem('refresh_token') || '{}');
    const st = JSON.parse(localStorage.getItem('status') || '{}');
    // const isLoggedIn = !!users;
    const isActivated = !!st;

    if (!user.name.length) {
      setUser({
        email: users.email,
        name: users.name,
      });
    }

    if (!isLoggedIn || !at.length || !rf.length || !st) {
      setUser({
        email: '',
        name: '',
      });
      setIsLoggedIn(false);
      return router.push('/');
    }
    if (at.length && rf.length) {
      checkAuth(users.email, at, rf);
    }
    if (!isLoggedIn && !at.length && rf.length && users.email.length) {
      setIsLoggedIn(false);
      $api
        .post('/auth/refresh', {
          refresh_token: rf,
        })
        .then((res) => {
          if (res.data.tokens.access_token.length) {
            localStorage.setItem('access_token', JSON.stringify(res.data.tokens.access_token));
            setIsLoggedIn(true);
          }
        });
    }
    if (isLoggedIn && at.length && rf.length && isActivated) {
      return router.push('/profile');
    }
    return router.push('/');
  }, []);
  return <>{children}</>;
}
