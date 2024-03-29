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
import { type OptionProps, type localFileDataType } from '@/lib/types';
import { dexieDb } from '@/lib/dexieDb';

const FormSchema = z.object({
  fileName: z.string().min(2, { message: "File name can't be empty" }),
});

const SaveModal: FC<OptionProps> = ({ data, setData }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fileName: data?.name ?? '' },
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    form.setValue('fileName', data?.name ?? '');
  }, [data?.name, form]);
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const fileList = await dexieDb.data.toArray();
    const fileExist =
      fileList.some(
        (file) => file.name.toLowerCase() === formData.fileName.toLowerCase(),
      ) && formData.fileName.trim() !== data?.name;
    if (fileExist) {
      toast({
        title: 'File name already exists',
        description: 'Please choose a different name',
        variant: 'destructive',
      });
      form.setValue('fileName', '');
      return;
    }
    const newFile: localFileDataType | undefined = {
      data: data?.data ?? '',
      name: formData.fileName.trim(),
      createdAt: data?.createdAt ?? new Date(),
      updatedAt: new Date(),
      images: data?.images ?? [],
    };
    data && (await dexieDb.data.delete(data?.name));
    data && (await dexieDb.data.add({ ...newFile }));
    setOpen(false);
    toast({
      title: 'Saved',
      description: 'File saved to local storage',
    });
    setData(newFile);
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
                {data?.name ? 'Save' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveModal;
