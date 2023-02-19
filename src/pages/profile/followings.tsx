import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/layouts/pagelayout';

const ProfileFollwingsPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Followings'></HeadComp>

      <PageLayout page={'followings profile'}></PageLayout>
    </>
  );
};
export default ProfileFollwingsPage;
