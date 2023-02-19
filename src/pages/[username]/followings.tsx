import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/layouts/pagelayout';

const ProfileFollowersPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Followers'></HeadComp>

      <PageLayout page={'followings user'}></PageLayout>
    </>
  );
};
export default ProfileFollowersPage;
