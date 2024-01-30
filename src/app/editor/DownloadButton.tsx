import { Button } from '@/components/ui/button';
import { type localFileDataType } from '@/lib/types';
import { DownloadIcon } from 'lucide-react';
import React, { Fragment, type FC } from 'react';

interface Props {
  data: localFileDataType | undefined;
}

const DownloadButton: FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <Button
        disabled
        className='col-span-2 flex w-full gap-1 md:max-w-[150px]'
        variant='outline'
      >
        <DownloadIcon className='h-4 w-4' />
        Download
      </Button>
    );
  }
  const file = new Blob([data.data], { type: 'text/plain' });
  return (
    <Button
      variant='default'
      disabled={!data}
      className='col-span-2 flex w-full gap-1 md:max-w-[150px]'
    >
      <Fragment>
        <DownloadIcon className='h-4 w-4' />
        <a
          download={`${data?.name}.md`}
          target='_blank'
          rel='noreferrer'
          href={URL.createObjectURL(file)}
        >
          Download
        </a>
      </Fragment>
    </Button>
  );
};

export default DownloadButton;
