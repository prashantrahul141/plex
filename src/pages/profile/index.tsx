import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/common/pagelayout';

const ProfilePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Profile'></HeadComp>

      <PageLayout page={'profile'}></PageLayout>
    </>
  );
};

export default ProfilePage;
