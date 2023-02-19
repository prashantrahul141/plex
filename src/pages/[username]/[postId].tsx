import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/layouts/pagelayout';
import type { FC } from 'react';

const UserProfilePage: FC = () => {
  return (
    <>
      <HeadComp headTitle='Post'></HeadComp>
      <PageLayout page={'post'}></PageLayout>
    </>
  );
};

export default UserProfilePage;
