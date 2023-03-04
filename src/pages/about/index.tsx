import HeadComp from '@components/common/headcomponent';
import type { FC } from 'react';
import Link from 'next/link';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

const AboutPage: FC = () => {
  return (
    <div className=' w-screen'>
      <HeadComp headTitle='About'></HeadComp>

      <main className='mx-auto mt-16 flex h-full w-full max-w-3xl flex-col gap-4 px-4'>
        <header className='mb-6 w-full'>
          <div className='mx-auto w-fit font-mukta text-3xl'>
            <span className='text-themePrimary-50'>About&nbsp;</span>
            <span
              className={`bg-gradient-to-r  from-welcomePageGradientColor-5 to-welcomePageGradientColor-6 bg-clip-text text-transparent`}>
              Plex
            </span>
          </div>
        </header>
        <section className='flex flex-col'>
          <span className='font-mukta text-2xl tracking-wide text-themePrimary-100'>
            What is plex?
          </span>
          <span className='font-mukta text-base font-thin tracking-wider text-themePrimary-50'>
            Plex is a fully featured social media application for getting
            together with people.
          </span>
        </section>

        <section className='flex flex-col'>
          <span className='font-mukta text-2xl tracking-wide text-themePrimary-100'>
            Sauce?
          </span>
          <span className='font-mukta text-base font-thin tracking-wider text-themePrimary-50'>
            Sauce? Sauce:&nbsp;
            <Link
              passHref={true}
              target='_blank'
              href='https://github.com/prashantrahul141/plex'
              title='sauce'
              className='text-themePrimary-300 hover:underline'>
              https://github.com/prashantrahul141/plex
            </Link>
          </span>
        </section>

        <section className='flex flex-col'>
          <span className='font-mukta text-2xl tracking-wide text-themePrimary-100'>
            Technologies used?
          </span>
          <span className='font-mukta text-base font-thin tracking-wider text-themePrimary-50'>
            Nextjs, React, tPRC, Prisma, MySQL, Cloudinary, TypeScript,
            Framer-motion.
          </span>
        </section>

        <section className='flex flex-col'>
          <span className='font-mukta text-2xl tracking-wide text-themePrimary-100'>
            Any more questions?
          </span>
          <span className='font-mukta text-base font-thin tracking-wider text-themePrimary-50'>
            Ask Me at&nbsp;
            <Link
              href={'https://prashantrahul.com'}
              passHref={true}
              target='_blank'
              className='text-themePrimary-300 hover:underline'>
              prashantrahul.com
            </Link>
          </span>
        </section>

        <Link href='/' className='mx-auto mt-12' aria-label='Sign in page'>
          <button className='btn hover:bg-themePrimary-30080 w-fit rounded-lg bg-themePrimary-400 py-1 hover:bg-gradient-to-bl hover:from-themePrimary-50/20 hover:to-transparent hover:text-themePrimary-50 '>
            Get Home
          </button>
        </Link>
      </main>
    </div>
  );
};
export default AboutPage;
