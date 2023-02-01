import HeadComp from '@components/common/headcomponent';
import WelcomePageButton from '@components/welcome/buttons';
import WelcomePageCards from '@components/welcome/cards';
import WelcomePageDownButton from '@components/welcome/downbutton';
import WelcomePageMainHeader from '@components/welcome/mainheader';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const WelcomePage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <HeadComp headTitle='Welcome'></HeadComp>
      <div className='h-screen w-screen'>
        <div className='mx-auto h-full w-fit pt-24'>
          <WelcomePageMainHeader></WelcomePageMainHeader>
          <WelcomePageButton router={router}></WelcomePageButton>
          <WelcomePageDownButton router={router}></WelcomePageDownButton>
          <WelcomePageCards></WelcomePageCards>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
