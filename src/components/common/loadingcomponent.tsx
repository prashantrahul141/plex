import type { FC } from 'react';

const LoadingComponent: FC = () => {
  return (
    <div className='h-full w-full rounded-full border border-themePrimary-200/50'>
      <div className='h-full w-full animate-spin rounded-full border-t-2 border-t-themePrimary-400'></div>
    </div>
  );
};

export default LoadingComponent;
