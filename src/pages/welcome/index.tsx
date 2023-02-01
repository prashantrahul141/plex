import HeadComp from '@components/common/headcomponent';
import WelcomePageButton from '@components/welcome/buttons';
import WelcomePageMainHeader from '@components/welcome/mainheader';
import type { NextPage } from 'next';

const WelcomePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Welcome'></HeadComp>
      <div className='h-screen w-screen'>
        <div className='mx-auto h-full w-fit pt-24'>
          <WelcomePageMainHeader></WelcomePageMainHeader>
          <WelcomePageButton></WelcomePageButton>
          <div className='relative mx-auto mt-24 h-8 w-8 animate-bounce rounded-full bg-themePrimary-300 shadow-lg shadow-white/[0.15]'>
            <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-themePrimary-50 '>
              ↓
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
