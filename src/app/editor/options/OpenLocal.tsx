'use client';

import React, { type FC, useEffect, useState } from 'react';
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
import { type OptionProps } from '@/lib/types';
import { ArrowUpDown, CheckIcon } from 'lucide-react';
import { type DataInterface, dexieDb } from '@/lib/dexieDb';

// type OptionListType = { item: string; fileData: localFileDataType };

const OpenLocal: FC<OptionProps> = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.name);
  const [options, setOptions] = useState<DataInterface[]>([]);
  useEffect(() => {
    void dexieDb.data.toArray().then((data) => {
      if (data) setOptions(data);
    });
  }, [open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='truncate md:max-w-[150px]'
          aria-expanded={open}
        >
          <span className='truncate'>
            {data?.name ? data?.name : 'Select file...'}
          </span>
          <ArrowUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search option...' className='h-9' />
          <CommandEmpty>No file found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.name}
                value={option.name}
                onSelect={(currentValue) => {
                  setData(option);
                  setValue(currentValue);
                  localStorage.setItem('mdState-cFN', option.name);
                  setOpen(false);
                }}
              >
                {option.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === option.name ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OpenLocal;
