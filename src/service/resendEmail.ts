import axios from 'axios';
import userStore from '@/store/store';
import { useQuery } from '@tanstack/react-query';



const useResendEmail = () => {
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
  const { data, isSuccess, isError, error, refetch } = useQuery(['status'], () => resendEmail(userEmail), {
    enabled: !!userEmail,
  });
};
