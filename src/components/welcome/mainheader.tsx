import type { FC } from 'react';

const WelcomePageMainHeader: FC = () => {
  return (
    <header className='h-1/2 text-center'>
      <header className=''>
        <h1 className='select-none font-unbounded text-8xl tracking-wider text-themePrimary-50'>
          Plex
        </h1>
      </header>
      <p>
        <span className='font-mukta tracking-wider text-themePrimary-100/60'>
          Get together
        </span>
      </p>
    </header>
  );
};

export default WelcomePageMainHeader;
