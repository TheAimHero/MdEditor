import { Button } from '@/components/ui/button';
import { type OptionProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import React, { type FC } from 'react';

const DeleteFile: FC<OptionProps> = ({ data, setData, className, editor }) => {
  function handleClick() {
    if (data) {
      localStorage.removeItem(
        `mdEditor-${data.name.trim().toLowerCase().replace(/\s+/g, '_')}`,
      );
      setData(undefined);
      if (editor) editor.getModel()?.setValue('');
    }
  }
  return (
    <Button
      variant={'outline'}
      role='combobox'
      className={cn(
        'flex min-w-[150px] items-center gap-2 bg-red-400/90 hover:bg-red-500/80',
        className,
      )}
      onClick={handleClick}
    >
      <Trash2 className='h-4 w-4' />
      <span>Delete File</span>
    </Button>
  );
};

export default DeleteFile;
