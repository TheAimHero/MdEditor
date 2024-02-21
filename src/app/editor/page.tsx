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
import { dexieDb } from '@/lib/dexieDb';
const OptionsBar = dynamic(() => import('./_options/OptionsBar'));
const DeleteFile = dynamic(() => import('./_options/DeleteFile'));
const DownloadButton = dynamic(() => import('./_options/DownloadButton'));
const NewFile = dynamic(() => import('./_options/NewFile'));
const OpenLocal = dynamic(() => import('./_options/OpenLocal'));
const SaveModal = dynamic(() => import('./_options/SaveModal'));
const ImageSidebar = dynamic(() => import('./ImageSidebar'));

const Page = () => {
  const [data, setData] = useState<localFileDataType | undefined>();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const device = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    const cFN: string | null = localStorage.getItem('mdState-cFN');
    if (cFN) {
      void dexieDb.data.get(cFN).then((data) => setData(data));
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
        {device && <ImageSidebar />}
      </OptionsBar>
      {!device && (
        <ImageSidebar className={'fixed bottom-16 right-4 w-[126px]'} />
      )}
    </Fragment>
  );
};

export default Page;
