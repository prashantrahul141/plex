import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/common/pagelayout';
import type { FC } from 'react';

const UserProfilePage: FC = () => {
  return (
    <>
      <HeadComp headTitle='User'></HeadComp>
      <PageLayout page={'bookmarks'}></PageLayout>
    </>
  );
};

export default UserProfilePage;
