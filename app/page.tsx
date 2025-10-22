'use client';
import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { getTokenFromStorage, isTokenExpired } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const t = getTokenFromStorage();
    if (t && !isTokenExpired(t)) {
      router.replace('/dashboard');
    }
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Toaster />
      <div className='w-full max-w-xl px-6'>
        <h1 className='text-4xl font-extrabold mb-6 text-center text-indigo-400'>
          AI Studio 👗
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
