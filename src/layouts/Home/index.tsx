'use client';
import React, { useEffect } from 'react';
import HeroSections from './HeroSections';

const HomeLayout = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <>
      <HeroSections />
    </>
  );
};

export default HomeLayout;
