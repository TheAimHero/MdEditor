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
import { type OptionProps, type localFileDataType } from '@/lib/types';
import { ArrowUpDown, CheckIcon } from 'lucide-react';

type OptionListType = { item: string; fileData: localFileDataType };

const OpenLocal: FC<OptionProps> = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.name);
  const [options, setOptions] = useState<OptionListType[]>([]);
  useEffect(() => {
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
    setOptions(fileList);
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
                key={option.item}
                value={option.item}
                onSelect={(currentValue) => {
                  setData(option.fileData);
                  setValue(currentValue);
                  localStorage.setItem('mdState-cFN', option.item);
                  setOpen(false);
                }}
              >
                {option.fileData.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === option.item ? 'opacity-100' : 'opacity-0',
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
