import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/layouts/pagelayout';

const SettingsPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Settings'></HeadComp>

      <PageLayout page={'settings'}></PageLayout>
    </>
  );
};
export default SettingsPage;
