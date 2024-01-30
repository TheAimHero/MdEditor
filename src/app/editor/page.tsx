'use client';

import React, { Fragment, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MdEditor from './MdEditor';
import Previewer from './Previewer';
import DesktopOptions from './DesktopOptions';
import { type localFileDataType } from '@/lib/types';
import { useMediaQuery } from '@uidotdev/usehooks';
import MobileOptions from './MobileOptions';
import { type editor } from 'monaco-editor';

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
        className='max-h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] w-full border-[1px] dark:border-white md:max-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)] sm:border-black'
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
      {device ? (
        <DesktopOptions data={data} setData={setData} editor={editor} />
      ) : (
        <MobileOptions
          data={data}
          setData={setData}
          editor={editor}
          className='group-last:col-span-2'
        />
      )}
    </Fragment>
  );
};

export default Page;
