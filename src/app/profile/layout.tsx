'use client';
import React, { useEffect } from 'react';
import userStore from '@/store/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AsideProfile from '@/components/AsideProfile';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = React.useState(true);
  const {
    user,
    isLoggedIn,
    isLoading,
    isActivated,
    setUser,
    setIsLoggedIn,
    checkAuth,
    logout,
    login,
    setStatusActive,
  } = userStore();

  const router = useRouter();

  const fetchStatus = async () => {
    if (typeof window === 'undefined') return;
    console.log(JSON.parse(localStorage.getItem('user') || '{}').email, 'email');
    const status = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/email/is-confirmed?email=` +
          JSON.parse(localStorage.getItem('user') || '{}').email,
      )
      .then((res) => res.data);
    return status;
  };

  const { isLoading: statusLoading, data: status } = useQuery(['status'], fetchStatus, {
    onSuccess: (data) => {
      console.log(data);
      setStatusActive(data);
      localStorage.setItem('status', JSON.stringify(data));
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const users = JSON.parse(localStorage.getItem('user') || '{}') || {};
    const at = JSON.parse(localStorage.getItem('access_token') || '{}');
    const rf = JSON.parse(localStorage.getItem('refresh_token') || '{}');
    const st = JSON.parse(localStorage.getItem('status') || '{}');
    console.log(users, 'users');
    const isLoggedIn = !!users;
    if (!isLoggedIn || !at.length || !rf.length) {
      setUser({
        email: '',
        name: '',
      });
      console.log(isLoggedIn, 'isLoggedIn');
      setIsLoggedIn(false);
      return router.push('/sign-in');
    }
    if (st) {
      console.log(st, 'st');
      return;
    }
    return router.push('/activate');
  }, []);

  return (
    <>
      <div>
        <AsideProfile
          isOpen={isOpen}
          close={() => {
            setOpen(false);
          }}
          show={() => {
            setOpen(true);
          }}
        />
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
