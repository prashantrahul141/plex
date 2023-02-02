import type { NextRouter } from 'next/router';
import type { FC } from 'react';

const WelcomePageButton: FC<{ router: NextRouter }> = ({ router }) => {
  return (
    <div className='mx-auto mt-60 flex w-fit gap-4'>
      <button
        onClick={() => void router.push('/signin')}
        className='btn hover:bg-themePrimary-30080 w-28 rounded-lg bg-themePrimary-300 hover:bg-gradient-to-bl hover:from-themePrimary-50/20 hover:to-transparent hover:text-themePrimary-50 '>
        Sign in
      </button>
      <button
        onClick={() => void router.push('/home')}
        className='btn w-28 rounded-md text-themePrimary-50/70 hover:border-themePrimary-300/60 hover:bg-transparent hover:text-themePrimary-50'>
        Explore
      </button>
    </div>
  );
};

export default WelcomePageButton;
