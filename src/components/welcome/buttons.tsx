import type { FC } from 'react';
import Link from 'next/link';

const WelcomePageButton: FC = () => {
  return (
    <div className='mx-auto mt-60 flex w-fit gap-4'>
      <Link href='/signin' aria-label='Sign in page'>
        <button className='btn hover:bg-themePrimary-30080 w-28 rounded-lg bg-themePrimary-400 hover:bg-gradient-to-bl hover:from-themePrimary-50/20 hover:to-transparent hover:text-themePrimary-50 '>
          Sign in
        </button>
      </Link>
      <Link href='/about' aria-label='home page'>
        <button className='btn w-28 rounded-md text-themePrimary-50/70 hover:border-themePrimary-300/60 hover:bg-transparent hover:text-themePrimary-50'>
          Learn more
        </button>
      </Link>
    </div>
  );
};

export default WelcomePageButton;
