import type { FC } from 'react';

const WelcomePageMainHeader: FC = () => {
  return (
    <header className='text-center'>
      <header className=''>
        <h1 className='font-unbounded text-8xl tracking-wider text-themePrimary-50'>
          Plex
        </h1>
      </header>
      <p>
        <span className='font-mukta tracking-wider text-themePrimary-100/70'>
          Get together with&nbsp;
          <span className='font-bold text-themePrimary-300'>Plex</span>
        </span>
      </p>
    </header>
  );
};

export default WelcomePageMainHeader;
