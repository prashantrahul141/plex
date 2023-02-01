import HeadComp from '@components/common/headcomponent';
import WelcomePageButton from '@components/welcome/buttons';
import WelcomePageMainHeader from '@components/welcome/mainheader';
import type { NextPage } from 'next';

const WelcomePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Welcome'></HeadComp>
      <div className='h-screen w-screen'>
        <div className='mx-auto w-fit pt-24'>
          <WelcomePageMainHeader></WelcomePageMainHeader>
          <WelcomePageButton></WelcomePageButton>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
