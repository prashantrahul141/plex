import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/common/pagelayout';
import type { NextPage } from 'next';

const TrendingPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Trending'></HeadComp>

      <PageLayout page={'trending'}></PageLayout>
    </>
  );
};

export default TrendingPage;
