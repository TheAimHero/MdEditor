'use client';

import React, { Fragment, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MdEditor from './MdEditor';
import Previewer from './Previewer';
import { type localFileDataType } from '@/lib/types';
import { useMediaQuery } from '@uidotdev/usehooks';
import { type editor } from 'monaco-editor';
import dynamic from 'next/dynamic';
const OptionsBar = dynamic(() => import('./options/OptionsBar'), { ssr: true });
const DeleteFile = dynamic(() => import('./options/DeleteFile'));
const DownloadButton = dynamic(() => import('./options/DownloadButton'));
const NewFile = dynamic(() => import('./options/NewFile'));
const OpenLocal = dynamic(() => import('./options/OpenLocal'));
const SaveModal = dynamic(() => import('./options/SaveModal'));

const Page = () => {
  const [data, setData] = useState<localFileDataType | undefined>();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const device = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    const cFN: string | null = localStorage.getItem('mdState-cFN');
    if (cFN) {
      const stringData = localStorage.getItem(cFN);
      if (stringData) {
        setData(JSON.parse(stringData) as localFileDataType);
      }
    }
  }, []);
  return (
    <Fragment>
      <ResizablePanelGroup
        direction={!device ? 'vertical' : 'horizontal'}
        className='max-h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] w-full border-[1px] dark:border-white sm:border-black md:max-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)]'
      >
        <ResizablePanel defaultSize={50}>
          <MdEditor data={data} setData={setData} setEditor={setEditor} />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className='w-3 bg-black dark:bg-white sm:w-[1px]'
        />
        <ResizablePanel defaultSize={50}>
          <Previewer source={data?.data} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <OptionsBar>
        <SaveModal data={data} setData={setData} />
        <NewFile data={data} setData={setData} editor={editor} />
        <OpenLocal data={data} setData={setData} />
        <DeleteFile data={data} setData={setData} editor={editor} />
        <DownloadButton data={data} />
      </OptionsBar>
    </Fragment>
  );
};

export default Page;
