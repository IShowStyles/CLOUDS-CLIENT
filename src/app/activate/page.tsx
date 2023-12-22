'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CommonButton from '@/components/ui/CommonButton';
import { useFetchStatus } from '@/hooks/useFetchStatus';
import userStore from '@/store/store';
import { useRouter } from 'next/navigation';
import { $api } from '@/service/http';
import axios from "axios";

const ActivatePage = () => {
  const router = useRouter();
  const [locked, setLock] = useState<boolean>(false);
  const { isActivatedStatus, refetch } = useFetchStatus();

  useEffect(() => {
    setTimeout(() => {
      setLock(false);
    }, 1500);

    return () => {
      setLock(false);
    };
  }, [locked]);

  const email = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').email : null;
  const resendEmail = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/email/get-confirmation-link?email=${email}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col my-60 items-center">
          <h1 className="text-3xl font-bold mb-4">Activate your account</h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your data to Clouds
            <br />
            Check email and activate account
          </p>
          <Link
            href={'https://mail.google.com/'}
            className="border-2 border-sky-500 px-5 ease-linear duration-150 py-2 rounded-xl hover:rounded-3xl"
          >
            Gmail
          </Link>
          <CommonButton
            isDisabled={locked}
            text={'check confirmation'}
            onClick={refetch}
            classes={'bg-sky-100 mt-8 max-w-[20rem] text-gray-700 px-5 py-2 border-sky-600 border-2'}
          />
          <CommonButton
            isDisabled={locked}
            text={'Resend Actvation Link'}
            onClick={resendEmail}
            classes={'bg-sky-100 mt-8 max-w-[20rem] text-gray-700 px-5 py-2 border-sky-600 border-2'}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivatePage;
