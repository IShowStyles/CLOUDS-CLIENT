'use client';
import { useId } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ButtonLink from '@/components/ui/ButtonLink';
import userStore from '@/store/store';
import { useRouter } from 'next/navigation';
import { $api } from '@/service/http';

export default function Login() {
  const useIDs = useId();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 'Invalid email address'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    name: Yup.string().required('Name is required').min(4, 'Name must be at least 8 characters'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(validationSchema),
  });

  const setDataLS = (data: {
    tokens: { access_token: string; refresh_token: string };
    isActive: boolean;
    email: string;
    name: string;
  }) => {
    localStorage.setItem('access_token', JSON.stringify(data.tokens.access_token));
    localStorage.setItem('refresh_token', JSON.stringify(data.tokens.access_token));
    localStorage.setItem('status', JSON.stringify(data.isActive));
    console.log(data.name, 'data.name');
    localStorage.setItem('user', JSON.stringify({ email: data.email, name: data.name }));
    setStatusActive(data.isActive);
  };
  const router = useRouter();
  const {
    user,
    isLoggedIn,
    isLoading,
    isActivated,
    checkAuth,
    login,
    logout,
    setUser,
    setIsLoading,
    setIsLoggedIn,
    setStatusActive,
  } = userStore();

  const handler = async (data: { name: string; email: string; password: string }) => {
    try {
      const res = await $api.post('/auth/local/signin', {
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (res.status === 200) {
        const { isActive } = res.data;
        setDataLS(res.data);
        setIsLoggedIn(true);
        setUser({ email: data.email, name: data.name });
        console.log(isActive, 'isActive');
        if (isActive) {
          return router.push('/profile');
        }
        return router.push('/activate');
      }
      if (res.status === 403) {
        alert('Login failed! User exists.');
        reset();
      }
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container max-w-5xl mx-auto py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Login to Clouds</h1>
          <p className="text-gray-600 rounded-md mb-8">Enter your data to Clouds</p>
          <ButtonLink text="Go signup" path="sign-up" classes="" />
          <form className="w-full mt-6" onSubmit={handleSubmit(handler)}>
            <div className="w-full mx-3 mb-4">
              <label htmlFor={useIDs + 'name'} className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                id={useIDs + 'name'}
                className="w-full border border-gray-400 p-2 rounded-md"
                type="text"
                {...register('name')}
              />
              {errors.name && errors.name.message && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="w-full mx-3 mb-4">
              <label htmlFor={useIDs + 'email'} className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                id={useIDs + 'email'}
                className="w-full border border-gray-400 p-2 rounded-md"
                type="text"
                {...register('email')}
              />
              {errors.email && errors.email.message && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="w-full mx-3 mb-8">
              <label htmlFor={useIDs + 'pass'} className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                id={useIDs + 'pass'}
                className="w-full border border-gray-400 p-2 rounded-md"
                type="password"
                {...register('password')}
              />
              {errors.password && errors.password.message && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <button className="bg-blue-500 mx-3 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
