'use client';
import React, { FC } from 'react';

interface CommonButtonProps {
  text: string;
  onClick: () => void;
  classes?: string;
  isDisabled?: boolean;
}

const CommonButton: FC<CommonButtonProps> = ({ text, onClick, classes, isDisabled }) => (
  <div onClick={onClick} className={'max-w-[13rem] w-full rounded-lg py-3' + ' ' + classes}>
    <button disabled={isDisabled} className="text-xl text-center w-full">
      {text}
    </button>
  </div>
);

export default CommonButton;
