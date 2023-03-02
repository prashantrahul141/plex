import HeadComp from '@components/common/headcomponent';
import Link from 'next/link';
import type { FC } from 'react';
import { AiOutlineCompass } from 'react-icons/ai';

const PageNotFoundError: FC = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <HeadComp headTitle='404'></HeadComp>
      <main className='flex flex-col items-center justify-center'>
        <AiOutlineCompass
          className='mb-4 text-themePrimary-50'
          size={80}></AiOutlineCompass>

        <span className='font-mukta text-4xl text-themePrimary-100'>404</span>
        <span className='font-mukta text-base font-thin text-themePrimary-50/80 sm:text-xl'>
          Looks like you <span className='italic'>maybe</span> lost
        </span>

        <Link href='/' className='mt-12' aria-label='Sign in page'>
          <button className='btn hover:bg-themePrimary-30080 w-fit rounded-lg bg-themePrimary-400 py-1 hover:bg-gradient-to-bl hover:from-themePrimary-50/20 hover:to-transparent hover:text-themePrimary-50 '>
            Get Home
          </button>
        </Link>
      </main>
    </div>
  );
};

export default PageNotFoundError;
