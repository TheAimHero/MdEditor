// import '@/styles/highlightTheme.css';
import React, { type FC } from 'react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import remarkGfm, { type Options as RemarkGfmOptions } from 'remark-gfm';
import remarkMath, { type Options as RemarkMathOptions } from 'remark-math';
import rehypeKatex, { type Options as RehypeKatexOptions } from 'rehype-katex';
import rehypeHighlight, {
  type Options as RehypeHighlightOptions,
} from 'rehype-highlight';

type Props = { className?: string };

const components = {
  h1: ({ className, ...props }: Props) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: Props) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: Props) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: Props) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: Props) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: Props) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: Props) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  em: ({ className, ...props }: Props) => (
    <em
      className={cn(
        'text-[1.1em] font-semibold italic text-yellow-500',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: Props) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: Props) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: Props) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: Props) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: Props) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className='my-4 md:my-8' {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: Props) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: Props) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: Props) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-transparent py-4',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: Props) => {
    console.log(className);
    return (
      <code
        className={cn(
          'relative rounded bg-transparent px-[0.3rem] py-[0.2rem] font-mono text-sm',
          className,
        )}
        {...props}
      />
    );
  },
};

const remarkMathOptions: RemarkMathOptions = {
  singleDollarTextMath: true,
};

const remarkGfmOptions: RemarkGfmOptions = {
  singleTilde: true,
  tableCellPadding: true,
  tablePipeAlign: true,
};

const rehypeKatexOptions: RehypeKatexOptions = {
  output: 'mathml',
  strict: false,
};

const rehypeHighlightOptions: RehypeHighlightOptions = {
  detect: true,
};

interface PreviewerProps {
  source: string;
}

const Previewer: FC<PreviewerProps> = ({ source }) => {
  return (
    <Markdown
      className={'prose dark:prose-invert h-full p-10 dark:bg-[#020817]'}
      remarkPlugins={[
        [remarkGfm, remarkGfmOptions],
        [remarkMath, remarkMathOptions],
      ]}
      rehypePlugins={[
        [rehypeKatex, rehypeKatexOptions],
        [rehypeHighlight, rehypeHighlightOptions],
      ]}
      components={components}
    >
      {source}
    </Markdown>
  );
};

export default Previewer;
