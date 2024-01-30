'use client';
import { type localFileDataType } from '@/lib/types';
import React, {
  type FC,
  Fragment,
  type Dispatch,
  type SetStateAction,
} from 'react';
import DeleteFile from './DeleteFile';
import OpenLocal from './OpenLocal';
import SaveModal from './SaveModal';
import { cn } from '@/lib/utils';
import { type editor } from 'monaco-editor';
import NewFile from './NewFile';
import DownloadButton from './DownloadButton';

interface Props {
  data: localFileDataType | undefined;
  setData: Dispatch<SetStateAction<localFileDataType | undefined>>;
  className?: string;
  editor: editor.IStandaloneCodeEditor | null;
}

const Options: FC<Props> = ({ setData, data, className, editor }) => {
  return (
    <Fragment>
      <div
        className={cn(
          'flex h-[60px] w-full items-center gap-1 px-1 sm:gap-5 sm:px-5 lg:gap-10 lg:px-10',
          className,
        )}
      >
        <SaveModal data={data} setData={setData} />
        <NewFile data={data} setData={setData} editor={editor} />
        <OpenLocal data={data} setData={setData} />
        <DeleteFile data={data} setData={setData} editor={editor} />
        <DownloadButton data={data} />
      </div>
    </Fragment>
  );
};

export default Options;
