'use client';
import React, { useEffect } from 'react';
import UploadPanel from '../../components/UploadPanel';
import GenerationList from '../../components/GenerationList';
import { setAuthToken } from '../../lib/api';
import {
  getTokenFromStorage,
  isTokenExpired,
  removeToken,
} from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/slices/authSlice';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const t = getTokenFromStorage();
    if (!t) {
      router.replace('/');
      return;
    }
    if (isTokenExpired(t)) {
      removeToken();
      setAuthToken(null);
      dispatch(logoutAction());
      router.replace('/');
      return;
    }
    setAuthToken(t);
  }, [dispatch, router]);

  const handleLogout = () => {
    removeToken();
    setAuthToken(null);
    dispatch(logoutAction());
    toast.success('Logged out successfully');
    router.replace('/');
  };

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <Toaster />
      <header className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>AI Fashion Studio</h1>
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all'
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div>
          <h2 className='text-xl font-semibold mb-3'>
            Your Recent Generations
          </h2>
          <GenerationList />
        </div>
        <UploadPanel />
      </div>
    </div>
  );
}
