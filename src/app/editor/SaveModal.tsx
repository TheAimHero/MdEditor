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
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const fileList: { item: string; fileData: localFileDataType }[] = [];
    for (let index = 0; index < localStorage.length; index++) {
      const item = localStorage.key(index);
      if (item?.includes('mdEditor-')) {
        const fileData = JSON.parse(
          localStorage.getItem(item)!,
        ) as localFileDataType;
        fileList.push({ fileData, item });
      }
    }
    const fileExist = fileList.some(
      (file) =>
        file.fileData.name.toLowerCase() === formData.fileName.toLowerCase(),
    );
    if (fileExist) {
      toast({
        title: 'File name already exists',
        description: 'Please choose a different name',
        variant: 'destructive',
      });
      form.setValue('fileName', '');
      return;
    }
    const removeFileKey = data?.name.trim().toLowerCase().replace(/\s+/g, '_');
    localStorage.removeItem(`mdEditor-${removeFileKey}`);
    const cleanFileName = formData.fileName
      .trim()
      .replace(/\s+/g, '_')
      .toLowerCase();
    const newFile: localFileDataType | undefined = {
      data: data?.data ?? '',
      name: formData.fileName.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    localStorage.setItem(`mdEditor-${cleanFileName}`, JSON.stringify(newFile));
    localStorage.setItem('mdState-cFN', `mdEditor-${cleanFileName}`);
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
