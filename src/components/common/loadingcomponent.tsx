import type { FC } from 'react';

const LoadingComponent: FC = () => {
  return (
    <div className='h-full w-full animate-spin-ease rounded-full border-4 border-t-4 border-themePrimary-200/10 border-t-themePrimary-400'></div>
  );
};

export default LoadingComponent;
