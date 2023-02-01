import { useRouter } from 'next/router';
import type { FC } from 'react';

const WelcomePageButton: FC = () => {
  const router = useRouter();
  return (
    <div className='mt-60 flex gap-4'>
      <button
        onClick={() => void router.push('/signin')}
        className='btn rounded-lg bg-themePrimary-300 hover:border-themePrimary-300/80 hover:bg-themePrimary-300/80 hover:text-themePrimary-50'>
        Sign in
      </button>
      <button className='btn rounded-md text-themePrimary-50/70 hover:border-themePrimary-300/60 hover:bg-transparent hover:text-themePrimary-50'>
        Learn more
      </button>
    </div>
  );
};

export default WelcomePageButton;
