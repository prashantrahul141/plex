import type { FC } from 'react';

const WelcomePageButton: FC = () => {
  return (
    <div className='mt-60 flex gap-4'>
      <button className='btn rounded-lg bg-themePrimary-300 hover:border-themePrimary-300/80 hover:bg-themePrimary-300/80 hover:text-themePrimary-50'>
        Get Started
      </button>
      <button className='btn rounded-md text-themePrimary-50/80 hover:border-themePrimary-300/60 hover:bg-transparent hover:text-themePrimary-50'>
        Learn more
      </button>
    </div>
  );
};

export default WelcomePageButton;
