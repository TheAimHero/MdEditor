import React, { type SetStateAction, type FC, type Dispatch } from 'react';
import DeleteFile from './DeleteFile';
import OpenLocal from './OpenLocal';
import SaveModal from './SaveModal';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { type localFileDataType } from '@/lib/types';
import { type editor } from 'monaco-editor';
import NewFile from './NewFile';
import DownloadButton from './DownloadButton';

interface Props {
  data: localFileDataType | undefined;
  setData: Dispatch<SetStateAction<localFileDataType | undefined>>;
  className?: string;
  editor: editor.IStandaloneCodeEditor | null;
}

const MobileOptions: FC<Props> = ({ data, setData, className, editor }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild className='fixed bottom-4 right-4'>
        <Button variant='outline'>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className={cn('grid grid-cols-2 gap-3 p-4', className)}>
          <SaveModal data={data} setData={setData} />
          <NewFile data={data} setData={setData} editor={editor} />
          <OpenLocal data={data} setData={setData} />
          <DeleteFile data={data} setData={setData} editor={editor} />
          <DownloadButton data={data} />
        </div>
        <div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileOptions;
