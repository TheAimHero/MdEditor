'use client';

import React, { Fragment, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MdEditor from './MdEditor';
import Previewer from './Previewer';

const Page = () => {
  const [data, setData] = useState<string>('');
  return (
    <Fragment>
      <ResizablePanelGroup
        direction='horizontal'
        className='min-h-[calc(100vh-60px)] w-full'
      >
        <ResizablePanel defaultSize={50}>
          <MdEditor data={data} setData={setData} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <Previewer source={data} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Fragment>
  );
};

export default Page;
