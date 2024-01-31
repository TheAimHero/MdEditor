import { Button } from '@/components/ui/button';
import { dexieDb } from '@/lib/dexieDb';
import { type OptionProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { type FC } from 'react';

const NewFile: FC<OptionProps> = ({ editor, setData, className }) => {
  async function handleClick() {
    const dataNum = await dexieDb.data.count();
    setData({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: `Untitled-${dataNum}`,
      data: '',
    });
    editor?.getModel()?.setValue('');
    editor?.focus();
  }
  return (
    <Button
      variant={'outline'}
      role={'combobox'}
      className={cn('truncate md:max-w-[100px]', className)}
      onClick={handleClick}
    >
      New File
    </Button>
  );
};

export default NewFile;
