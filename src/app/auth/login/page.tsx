'use client';

import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }).min(2).max(50),
  password: z.string().min(8, 'Password must be at least 8 characters').max(50),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn('credentials', values);
  }

  return (
    <MaxWidthWrapper className='mt-20 grid grid-flow-col grid-cols-2'>
      <div className='flex flex-col items-center justify-between gap-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col items-center justify-between'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormDescription>Enter Email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormDescription>Enter Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'default'}
              className='mt-10 w-full max-w-md'
              type='submit'
            >
              Submit
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          variant={'default'}
          className='w-full max-w-md bg-slate-400'
        >
          Sign in with Google
        </Button>
        <span className='text-xs font-semibold'>
          App in development. Please use email and password as auth
        </span>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
