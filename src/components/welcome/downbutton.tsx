import type { NextRouter } from 'next/router';
import type { FC } from 'react';

const WelcomePageDownButton: FC<{ router: NextRouter }> = ({ router }) => {
  return (
    <div className='relative mx-auto mt-24 h-8 w-8 animate-bounce rounded-full bg-themePrimary-300 shadow-lg shadow-white/[0.15]'>
      <button
        className='h-full w-full'
        onClick={() => void router.push('/welcome#learn-more')}>
        <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-themePrimary-50 '>
          ↓
        </span>
      </button>
    </div>
  );
};

export default WelcomePageDownButton;
