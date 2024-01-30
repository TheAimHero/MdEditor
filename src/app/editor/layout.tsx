import { ClientOnly } from '@/components/ClientOnly';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientOnly>{children}</ClientOnly>;
};

export default Layout;
