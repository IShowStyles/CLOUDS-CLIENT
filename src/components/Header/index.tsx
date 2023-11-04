'use client';
import Link from 'next/link';
import React from 'react';
import CommonButton from '../ui/CommonButton';
import { usePathname, useRouter } from 'next/navigation';
import userStore from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/profile',
    name: 'Profile',
  },
];

export default function Header() {
  const { user, isLoggedIn, isLoading, isActivated, checkAuth, login, logout, setUser, setIsLoading, setIsLoggedIn } =
    userStore();
  const router = useRouter();
  return (
    <header className="bg-gradient-to-r z-100 from-sky-300 to-slate-400 shadow-lg backdrop-filter backdrop-blur-xl backdrop-saturate-300">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl">Clouds, Inc</p>
          </div>
          <ul className="flex absolute items-center right-1/2 translate-x-1/2">
            {routes.map(({ name, path }, index) => (
              <li className={`${index !== routes.length - 1 ? 'mr-8' : ''}`} key={index.toString()}>
                <Link href={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
