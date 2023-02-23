import HeadComp from '@components/common/headcomponent';
import type { NextPage } from 'next';
import { IoCloudOfflineSharp } from 'react-icons/io5';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

const OfflinePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Offline'></HeadComp>
      <main className='flex h-screen w-screen items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <span>
            <IoCloudOfflineSharp className='text-6xl text-themePrimary-50'></IoCloudOfflineSharp>
          </span>
          <span className='h-fit font-mukta text-2xl tracking-wide text-themePrimary-50'>
            Couldn&apos;t connect to the internet.
          </span>
        </div>
      </main>
    </>
  );
};

export default OfflinePage;
