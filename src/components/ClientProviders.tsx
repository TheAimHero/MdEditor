'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider defaultTheme='dark' attribute='class'>
        {children}
        <Toaster />
      </NextThemesProvider>
    </SessionProvider>
  );
}

export default ClientProviders;
