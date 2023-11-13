'use client';
import React, { useEffect, useState } from 'react';
import BgAnimation from '@/layouts/Home/HeroSections/BgAnimation';
import { motion } from 'framer-motion';

type TextNodeType = {
  [key: string]: string;
};

const textNode: TextNodeType[] = [
  {
    title: '24/7 Customer Support',
    text: 'We are here to help. Search our FAQ for answers to anything you need.',
  },
  {
    title: 'Unmatched Security',
    text: "In today's digital age, the safety of your data is paramount. ",
  },
  {
    title: 'Unlimited Bandwidth',
    text: 'We offer unlimited bandwidth for all of our customers.',
  },
];

interface IImagePath {
  [key: number]: string;
}

function HeroSections() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [idxImages, setIdxImages] = useState<number>(1);
  const DURATION = 4.5;
  const [completed, setCompleted] = useState(false);
  const imagesPath: IImagePath = {
    1: '/images/about.avif',
    2: '/images/about_1.png',
    3: '/images/about_2.png',
    4: '/images/about_7.png',
    5: '/images/about.avif',
    6: '/images/about_4.png',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setIdxImages((prevIdx) => (prevIdx % 5) + 1);
      setCompleted(false);
    }, DURATION * 1000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [completed]);

  return (
    <section
      style={{
        width: '100vw',
        height: '85vh',
      }}
      className=""
    >
      {Object.values(imagesPath).map((elem, idx) => (
        <BgAnimation
          completed={() => {
            setCompleted(!completed);
          }}
          key={idx.toString()}
          path={elem}
          isOpen={idx === idxImages - 1}
        />
      ))}
      <div className="top-[64px] right-0 w-full h-full flex items-center z-80 justify-center bottom-0 left-0 absolute ">
        <h1 className="prose-h1 z-80 absolute text-sky-50 text-3xl uppercase">clouds, inc</h1>
      </div>
      <div className="container relative">
        <div
          style={{
            width: '100vw',
            height: '85vh',
          }}
          className="wrapper z-90"
        >
          <motion.ul
            initial={{ opacity: 0, translateX: '-65%', width: '35%' }}
            animate={{ opacity: 1, translateX: 0, width: '100%' }}
            transition={{ duration: 1.75, ease: 'linear' }}
            className="bg-sky-300 max-w-sm w-full p-3.5 rounded-2xl"
          >
            {textNode.map(({ text, title }, idx) => (
              <li key={idx.toString()} className="flex items-start text-sky-50">
                <strong className="font-bold mr-2 text-xl"> {idx + 1}</strong>
                <p className="text-sky-50 flex flex-col">
                  <strong className="font-bold mr-2">{title}</strong>
                  <span>{text}</span>
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default HeroSections;
