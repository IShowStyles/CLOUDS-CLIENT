import React, { FC, useState } from 'react';
import AsideProfile from '@/components/AsideProfile';

interface IProfileLayout {
  data: any;
}

const ProfileLayout: FC<IProfileLayout> = ({ data }) => {
  const [sidebarOpen, setOpen] = useState(false);

  return (
    <>
      <AsideProfile show={() => setOpen(true)} close={() => setOpen(false)} isOpen={sidebarOpen} data={data} />
    </>
  );
};

export default ProfileLayout;
