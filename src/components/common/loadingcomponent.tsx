import type { FC } from 'react';

const LoadingComponent: FC<{ bgColor?: string; spinnerColor?: string }> = ({
  bgColor = 'border-themePrimary-200/10',
  spinnerColor = 'border-t-themePrimary-400',
}) => {
  return (
    <div
      className={`h-full w-full animate-spin-ease rounded-full border-4 border-t-4 ${bgColor} ${spinnerColor}`}></div>
  );
};

export default LoadingComponent;
