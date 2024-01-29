import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-10 '>
      <div>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={'/editor'}
        >
          Go to Editor
        </Link>
      </div>
      <span>It Works!!!</span>
    </main>
  );
}
