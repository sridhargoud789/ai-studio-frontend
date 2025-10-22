// @ts-ignore
import './globals.css';
import React from 'react';
import { Providers } from '../store/providers';

export const metadata = {
  title: 'AI Studio',
  description: 'Mini AI Studio - frontend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
