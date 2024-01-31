'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, type FC, useEffect } from 'react';

interface Props {
  className?: string;
}

const ImageSidebar: FC<Props> = ({ className }) => {
  const [s, setS] = useState<FileList | null>(null);
  useEffect(() => {
    if (s) {
      console.log(s);
    }
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className={cn('flex items-center gap-2 lg:min-w-[150px]', className)}
        >
          Images
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Images</SheetTitle>
          <SheetDescription>
            Add, remove images from your project.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Image
            </Label>
            <Input
              id='name'
              accept='image/*'
              type='file'
              onChange={(e) => setS(e.target.files)}
              className='col-span-3'
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ImageSidebar;
