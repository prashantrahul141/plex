import type { NextPage } from 'next';
import HeadComp from '@components/common/headcomponent';
import PageLayout from '@components/layouts/pagelayout';

const BookmarksPage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Bookmarks'></HeadComp>

      <PageLayout page={'bookmarks'}></PageLayout>
    </>
  );
};
export default BookmarksPage;
