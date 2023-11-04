import Link from 'next/link';
import React, { FC } from 'react';

interface IButtonLink {
  text: string;
  path: string;
  classes: string;
}

const ButtonLink: FC<IButtonLink> = ({ text, path, classes }) => (
  <div className={'w-64 bg-gradient-to-bl from-cyan-500 to-cyan-600 rounded-md shadow-md hover:shadow-lg' + classes}>
    <Link className="block text-center w-full px-4 py-2 text-white font-semibold hover:text-cyan-200" href={path}>
      {text}
    </Link>
  </div>
);

export default ButtonLink;
