'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Cloud } from 'lucide-react';
import { api } from '../lib/api';
import { fetchRecentRequest } from '../store/slices/generationSlice';
import toast from 'react-hot-toast';
import formatError from '../lib/formatError';

export default function UploadPanel() {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !prompt) {
      toast.error('Please upload an image and enter a prompt.');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('prompt', prompt);

    try {
      setUploading(true);
      const res = await api.post('/generation/create', fd);
      toast.success('Image uploaded successfully!');
      dispatch(fetchRecentRequest());
      setPrompt('');
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      toast.error(formatError(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={submit} className='bg-gray-900 p-6 rounded-2xl shadow'>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 mb-3 cursor-pointer transition-colors ${
          isDragActive ? 'border-indigo-500' : 'border-gray-700'
        }`}
      >
        <input {...getInputProps()} />
        <div className='flex items-center gap-3 justify-center text-gray-400'>
          <Cloud />
          <div>
            <div className='font-medium'>
              {isDragActive
                ? 'Drop the image here...'
                : 'Drag & drop an image, or click to select'}
            </div>
            <div className='text-sm'>PNG, JPG, GIF — up to 10MB</div>
          </div>
        </div>
      </div>

      {preview && (
        <div className='mb-3'>
          <img
            src={preview}
            alt='preview'
            className='w-full h-48 object-contain rounded-md border border-gray-800'
          />
        </div>
      )}

      <input
        type='text'
        placeholder='Describe the fashion look...'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='w-full p-3 mb-3 bg-gray-800 rounded-lg outline-none'
      />

      <div className='flex gap-3'>
        <button
          type='submit'
          className='bg-indigo-600 px-4 py-2 rounded-lg font-semibold disabled:opacity-60'
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Generate Look'}
        </button>
      </div>
    </form>
  );
}
