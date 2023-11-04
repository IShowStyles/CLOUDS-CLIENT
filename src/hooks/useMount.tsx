import { useEffect, useState } from 'react';

export const useMount = (opened: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      // setTimeout(() => {
      setMounted(true);
      // setMounted(false);
      // }, 1000 / 3);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, 3000);
    }
  }, [opened]);

  return {
    mounted,
  };
};