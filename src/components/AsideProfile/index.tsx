'use client';
import React, { FC } from 'react';
import userStore from '@/store/store';
import Link from 'next/link';

interface IAsideProfile {
  isOpen: boolean;
  close: () => void;
  show: () => void;
}

const AsideProfile: FC<IAsideProfile> = ({ isOpen, close, show }) => {
  const {
    user,
    isLoggedIn,
    isLoading,
    isActivated,
    checkAuth,
    login,
    logout: logoutState,
    setIsLoading,
    setIsLoggedIn,
  } = userStore();
  const logout = () => {
    logoutState(user.email);
    close();
  };

  const asideClasses = isOpen ? 'max-w-2xl w-full' : 'w-24';
  const navLinks = [
    {
      name: 'Home',
      path: '/profile',
    },
  ];

  return (
    <>
      <div
        onMouseEnter={show}
        onMouseLeave={close}
        className={
          isOpen
            ? 'max-w-[28rem] w-full bg-blue-600/[.67] text-white h-screen flex flex-col duration-100 ease-linear'
            : 'max-w-[14rem] w-full duration-100 ease-linear bg-blue-600/[.67] text-white h-screen flex flex-col'
        }
      >
        {isOpen ? (
          <>
            <div className="py-4 px-6">
              <h1 className="text-xl font-bold">Clouds Dashboard</h1>
              <p className="text-sm mt-2">Welcome, {user.name}!</p>
            </div>
            <nav className="flex-1">
              <ul className="space-y-4 mt-6">
                {navLinks.map(({ name, path }, idx) => (
                  <li key={idx.toString()}>
                    <Link href={path} className="flex items-center py-2 px-6 rounded-lg hover:bg-blue-600">
                      <svg
                        fill="#000000"
                        width={28}
                        height={35}
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 495.398 495.398"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <g>
                              <g>
                                <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"></path>
                                <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p className="ml-4">{name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <button className="w-full py-4 px-6 bg-blue-600 max-w-xl hover:bg-blue-600" onClick={logout}>
                <p>Logout</p>
              </button>
            </div>
          </>
        ) : (
          <div className="">
            <div className="p-3 py-4">
              <h1 className="text-xl font-bold">Clouds Dashboard</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AsideProfile;
