'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, registerRequest } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector((s: RootState) => s.auth);
  const hasLoggedInRef = useRef(false);

  useEffect(() => {
    if (auth.token && !hasLoggedInRef.current) {
      hasLoggedInRef.current = true;
      toast.success('Logged in');
      router.push('/dashboard');
      return;
    }

    if (auth.error) {
      toast.error(String(auth.error));
    }
  }, [auth.token, auth.error, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Fill username and password');
      return;
    }

    if (mode === 'login') {
      dispatch(loginRequest({ username, password }));
    } else {
      dispatch(registerRequest({ username, password }));
    }
  };

  return (
    <form
      onSubmit={submit}
      className='bg-gray-900 p-8 rounded-2xl max-w-md mx-auto shadow-lg'
    >
      <h2 className='text-2xl font-bold mb-4 text-center'>
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>

      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-full p-3 mb-3 bg-gray-800 rounded-lg outline-none'
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full p-3 mb-3 bg-gray-800 rounded-lg outline-none'
      />

      <button
        type='submit'
        className='w-full py-3 bg-indigo-600 rounded-lg font-semibold disabled:opacity-60'
        disabled={auth.loading}
      >
        {auth.loading
          ? mode === 'login'
            ? 'Logging in...'
            : 'Registering...'
          : mode === 'login'
          ? 'Login'
          : 'Register'}
      </button>

      <p className='mt-3 text-sm text-gray-400 text-center'>
        {mode === 'login' ? 'New here?' : 'Have an account?'}{' '}
        <span
          className='text-indigo-400 cursor-pointer'
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </span>
      </p>
    </form>
  );
}
