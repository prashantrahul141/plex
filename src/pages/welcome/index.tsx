import HeadComp from '@components/common/headcomponent';
import WelcomePageButton from '@components/welcome/buttons';
import WelcomePageCards from '@components/welcome/cards';
import WelcomePageDownButton from '@components/welcome/downbutton';
import WelcomePageMainHeader from '@components/welcome/mainheader';
import type { NextPage } from 'next';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

const WelcomePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Welcome'></HeadComp>
      <div className='h-screen w-screen overflow-x-hidden'>
        <div className='mx-0 h-full w-screen pt-24'>
          <WelcomePageMainHeader></WelcomePageMainHeader>
          <WelcomePageButton></WelcomePageButton>
          <WelcomePageDownButton></WelcomePageDownButton>
          <WelcomePageCards></WelcomePageCards>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
