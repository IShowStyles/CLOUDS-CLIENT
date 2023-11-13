import React, { useEffect } from 'react';
import { useMount } from '@/hooks/useMount';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const hiddenMask = {
  WebkitMaskImage: `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,31) 30px, rgba(0,0,0,31) 30px)`,
};

const visibleMask = {
  WebkitMaskImage: `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,31) 0px, rgba(0,0,0,31) 30px)`,
};

const animations: Variants = {
  exiting: {
    ...hiddenMask,
    opacity: 0.333,
    // scale: 0.3,
  },
  initial: {
    ...visibleMask,
    opacity: 1,
    visibility: 'visible',
    scale: 1,
  },
  entering: {
    ...visibleMask,
    opacity: 1,
    visibility: 'visible',
    scale: 1,
  },
};

const BgAnimation = ({ isOpen, path, completed }: { isOpen: boolean; path: string; completed: () => void }) => {
  const { mounted } = useMount(isOpen);
  useEffect(() => {
    console.log('isOpen is noMount', isOpen && !mounted);
    console.log('isOpen', isOpen);
    console.log('mounted', mounted);
  }, [mounted]);

  if (!mounted) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-[64px] z-70 right-0 left-0 bottom-0 w-full h-full darked__bg"
        style={{
          width: '100vw',
          height: '85vh',
        }}
        onAnimationComplete={completed}
        initial={isOpen && !mounted ? 'entering' : 'exiting'}
        variants={animations}
        animate={isOpen ? 'entering' : 'exiting'}
        transition={{ duration: 2.25, ease: 'linear' }}
      >
        <img className={'image_full'} src={path} alt="" />
      </motion.div>
    </AnimatePresence>
  );
};

export default BgAnimation;
