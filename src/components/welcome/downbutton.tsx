import type { FC } from 'react';

const WelcomePageDownButton: FC = () => {
  return (
    <div className='relative mx-auto mt-28 h-8 w-8 animate-bounce'>
      <span className='h-full w-full'>
        <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-themePrimary-50 '>
          ↓
        </span>
      </span>
    </div>
  );
};

export default WelcomePageDownButton;
