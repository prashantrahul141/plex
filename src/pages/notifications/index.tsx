import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/common/pagelayout';
import type { NextPage } from 'next';

const NotificationsPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Notifications'></HeadComp>

      <PageLayout page={'notifications'}></PageLayout>
    </>
  );
};

export default NotificationsPage;
