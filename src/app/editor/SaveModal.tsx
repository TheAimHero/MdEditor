'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  data: string;
  initialFileName: string;
}

const FormSchema = z.object({
  fileName: z.string().min(2, { message: "File name can't be empty" }),
});

const SaveModal: FC<Props> = ({ data, initialFileName }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fileName: initialFileName ?? '' },
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    form.setValue('fileName', initialFileName);
  }, [initialFileName, form]);
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const fileList: string[] = [];
    for (let index = 0; index < localStorage.length; index++) {
      const item = localStorage.key(index);
      if (item?.includes('mdEditor-')) {
        fileList.push(item.split('-')[1]!);
      }
    }
    if (
      fileList.some((fileName) => fileName === formData.fileName) &&
      initialFileName === ''
    ) {
      toast({
        title: 'File name already exists',
        description: 'Please choose a different name',
        variant: 'destructive',
      });
      form.setValue('fileName', '');
      return;
    }
    localStorage.setItem(`mdEditor-${formData.fileName}`, data);
    setOpen(false);
    toast({
      title: 'Saved',
      description: 'File saved to local storage',
    });
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant='outline'>Save Local</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Save Local</DialogTitle>
          <DialogDescription>Save file to local storage</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='fileName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filename</FormLabel>
                  <FormControl>
                    <Input placeholder='MyMd' {...field} />
                  </FormControl>
                  <FormDescription>Your File Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' className='mx-auto w-32'>
                {initialFileName ? 'Save' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveModal;
