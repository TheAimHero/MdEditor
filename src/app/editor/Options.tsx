'use client';
import { Loader2, Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { type FC, Fragment, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const Options: FC<Props> = ({ children }) => {
  const { data, status } = useSession();
  if (status === 'loading') {
    <div className='flex h-[60px] w-full items-center justify-between'>
      <span className='mx-auto'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </span>
    </div>;
  }
  return (
    <Fragment>
      <div className='flex h-[60px] w-full items-center gap-10 px-10'>
        {children}
      </div>
    </Fragment>
  );
};

export default Options;
