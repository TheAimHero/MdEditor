'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  if (errorParam?.includes('Sign in with Google')) {
    return (
      <div className='mx-auto flex h-[calc(100vh-60px)] w-full max-w-md items-center'>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          variant={'default'}
          className='w-full max-w-md'
        >
          Sign in with Google
        </Button>
      </div>
    );
  }
  if (errorParam?.includes('Failed to create user')) {
    return <div className='w-full max-w-md'>Failed to create user</div>;
  }
};

export default Page;
