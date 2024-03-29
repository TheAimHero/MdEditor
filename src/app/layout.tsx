import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { TRPCReactProvider } from '@/trpc/react';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import ClientProviders from '@/components/ClientProviders';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Qd.',
  description: 'Markdown On The Fly.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(`bg-[hsl(var(--background))] font-sans`, inter.variable)}
      >
        <TRPCReactProvider>
          <ClientProviders>
            <Navbar />
            {children}
            <Toaster />
          </ClientProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
