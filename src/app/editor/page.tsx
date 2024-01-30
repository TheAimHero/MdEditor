'use client';

import React, { Fragment, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import MdEditor from './MdEditor';
import Previewer from './Previewer';
import Options from './Options';
import SaveModal from './SaveModal';
import OpenLocal from './OpenLocal';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [data, setData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  useEffect(() => {
    if (fileName) {
      setData(localStorage.getItem(`mdEditor-${fileName}`) ?? '');
    }
  }, [fileName]);
  // @todo: Allow to delete a file
  // @todo: Allow to rename a file
  // @fix: fileName case not considered when saving
  return (
    <Fragment>
      <ResizablePanelGroup
        direction='horizontal'
        className='max-h-[calc(100vh-120px)] min-h-[calc(100vh-120px)] w-full'
      >
        <ResizablePanel defaultSize={50}>
          <MdEditor data={data} setData={setData} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <Previewer source={data} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Options>
        <SaveModal initialFileName={fileName} data={data} />
        <Button
          variant={'outline'}
          role={'combobox'}
          onClick={() => {
            setData('');
            setFileName('');
          }}
        >
          New File
        </Button>
        <OpenLocal initialValue={fileName} setFileName={setFileName} />
      </Options>
    </Fragment>
  );
};

export default Page;
