import { Button } from '@/components/ui/button';
import { type OptionProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { type FC } from 'react';
import { dexieDb } from '@/lib/dexieDb';

const DeleteFile: FC<OptionProps> = ({ data, setData, className, editor }) => {
  function handleClick() {
    if (data) {
      dexieDb.data.delete(data.name);
      setData(undefined);
      if (editor) editor.getModel()?.setValue('');
    }
  }
  return (
    <Button
      variant={'outline'}
      role='combobox'
      className={cn(
        'flex items-center gap-2 bg-red-400/90 hover:bg-red-500/80 md:max-w-[100px]',
        className,
      )}
      onClick={handleClick}
    >
      <span className='truncate'>Delete</span>
    </Button>
  );
};

export default DeleteFile;
