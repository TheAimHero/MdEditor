'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import React, {
  type FC,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  initialValue?: string;
  setFileName: Dispatch<SetStateAction<string>>;
}

const OpenLocal: FC<Props> = ({ setFileName, initialValue }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  useEffect(() => {
    const fileList: string[] = [];
    for (let index = 0; index < localStorage.length; index++) {
      const item = localStorage.key(index);
      if (item?.includes('mdEditor-')) {
        fileList.push(item.split('-')[1]!);
      }
    }
    setOptions(fileList);
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {initialValue
            ? options.find((fName) => fName === initialValue)
            : 'Open File'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty>No File Found...</CommandEmpty>
          <CommandGroup>
            {options.map((fName) => (
              <CommandItem
                key={fName}
                value={fName}
                onSelect={(currentValue) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  setFileName(currentValue ? currentValue : '');
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    initialValue === fName ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {fName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OpenLocal;
