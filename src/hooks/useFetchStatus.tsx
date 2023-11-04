'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import userStore from '@/store/store';
import { useQuery } from '@tanstack/react-query';

const fetchStatus = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`https://localhost:3049/api/email/is-confirmed?email=${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type ReturnType = {
  isActivatedStatus: boolean;
  refetch: () => void;
};

export const useFetchStatus = (): ReturnType => {
  if (typeof window === 'undefined') return;
  const router = useRouter();
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
  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
  const { data, isSuccess, isError, error, refetch } = useQuery(['status'], () => fetchStatus(userEmail));
  const isActivatedStatus = data as boolean;
  if (isSuccess && isActivatedStatus) {
    alert('Your account is activated');
    router.push('/profile');
  }
  if (isError) {
    console.error('Failed to fetch activation status:', error);
  }
  return {
    isActivatedStatus,
    refetch,
  };
};
