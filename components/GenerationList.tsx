'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchRecentRequest } from '../store/slices/generationSlice';
import { API_BASE } from '../lib/api';

export default function GenerationList() {
  const dispatch = useDispatch();
  const gens = useSelector((s: RootState) => s.generation.list);
  const loading = useSelector((s: RootState) => s.generation.loading);

  useEffect(() => {
    dispatch(fetchRecentRequest());
  }, [dispatch]);

  if (loading) return <div className='text-gray-400'>Loading...</div>;
  if (!gens.length)
    return <div className='text-gray-400'>No generations yet</div>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {gens.map((g: any) => (
        <div key={g.id} className='bg-gray-800 p-3 rounded-lg'>
          <img
            src={`${API_BASE}/${g.image_path.replace(/\\/g, '/')}`}
            alt={g.prompt}
            className='w-full h-48 object-cover rounded-md mb-2'
          />
          <p className='text-sm text-gray-300'>{g.prompt}</p>
        </div>
      ))}
    </div>
  );
}
