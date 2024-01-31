import { Button } from '@/components/ui/button';
import { type OptionProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { type FC } from 'react';

const NewFile: FC<OptionProps> = ({ editor, setData, className }) => {
  function handleClick() {
    setData({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: `Untitled-${localStorage.length + 1}`,
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
