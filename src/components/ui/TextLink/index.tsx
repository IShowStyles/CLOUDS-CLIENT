import Link from 'next/link';
import React from 'react';

const TextLink = ({ text, path, classes }: any) => {
  return (
    <Link
      className={'text-lg text-black hover:underline duration-300 linear hover:underline-offset-2' + classes}
      href={path}
    >
      <p>{text}</p>
    </Link>
  );
};
export default TextLink;
