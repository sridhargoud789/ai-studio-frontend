'use client';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from './index';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
