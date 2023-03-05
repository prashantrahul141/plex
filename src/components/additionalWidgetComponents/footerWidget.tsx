import Link from 'next/link';
import type { FC } from 'react';
const FooterWidget: FC = () => {
  return (
    <div className='ml-4 mt-6'>
      <span className='font-mukta text-xl leading-none tracking-wide text-themePrimary-50'>
        Links
      </span>
      <section className='ml-3 mt-2 font-mukta font-thin tracking-wide text-themePrimary-50/70'>
        <main className=' flex flex-wrap gap-2'>
          <Link href={'/about'} className='hover:underline' title='About Page'>
            About
          </Link>
          <Link
            href={'https://github.com/prashantrahul141/plex'}
            className='hover:underline'
            passHref={true}
            title='Source Code on Github'
            target='_blank'>
            Source
          </Link>
        </main>
        <Link href={'/plex'} className=''>
          <span className='font-ibmplex'>&copy; </span>Plex&nbsp;
          <span className='font-ibmplex tracking-tight'>2023</span>
        </Link>
      </section>
    </div>
  );
};

export default FooterWidget;
