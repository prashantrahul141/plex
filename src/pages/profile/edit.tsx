import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/common/pagelayout';

const ProfileEditPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Edit Profile'></HeadComp>

      <PageLayout page={'edit profile'}></PageLayout>
    </>
  );
};
export default ProfileEditPage;
