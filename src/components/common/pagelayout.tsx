import type { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationsList from '@components/lists/notificationsList';
import PostList from '@components/lists/postsLists';
import BookmarksList from '@components/lists/bookmarksList';
import TrendingList from '@components/lists/trendingList';
import SettingsForm from '@components/forms/settingsform';
import TopBarNavigation from './topbarnavigation';
import { useSession } from 'next-auth/react';
import SideBarNavigation from './sidebarnavigation';
import { useRouter } from 'next/router';
import LoadingComponent from '@components/common/loadingcomponent';
import AdditionalWidgets from '@components/common/additionalWidgets';

type pages =
  | 'home'
  | 'trending'
  | 'notifications'
  | 'bookmarks'
  | 'settings'
  | 'profile';

const PageLayout: FC<{ page: pages }> = ({ page }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    return (
      <div className='h-full w-full'>
        <div className='mx-auto flex w-screen flex-col gap-2 sm:w-max sm:flex-row sm:gap-0'>
          <div className='z-50 w-full min-w-max sm:hidden'>
            <TopBarNavigation
              activeTab={page}
              authorAvatar={
                session.user.image || '/public/static/defaultAvatar.png'
              }
              authorName={session.user.name || 'user'}></TopBarNavigation>
          </div>

          <div className='hidden sm:block'>
            <SideBarNavigation
              activeTab={page}
              authorAvatar={
                session.user.image || '/public/static/defaultAvatar.png'
              }
              authorName={session.user.name || 'user'}></SideBarNavigation>
          </div>

          <AnimatePresence>
            <div className='max-w-2xl flex-grow'>
              <motion.div className=''>
                {page === 'home' && <PostList></PostList>}

                {page === 'trending' && <TrendingList></TrendingList>}
                {page === 'notifications' && (
                  <NotificationsList></NotificationsList>
                )}
                {page === 'bookmarks' && <BookmarksList></BookmarksList>}
                {page === 'settings' && <SettingsForm></SettingsForm>}
              </motion.div>
            </div>
          </AnimatePresence>
          <div className='hidden lg:block'>
            <AdditionalWidgets></AdditionalWidgets>
          </div>
        </div>
      </div>
    );
  } else if (status === 'unauthenticated') {
    void router.push('/');
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='h-8 w-8'>
        <LoadingComponent></LoadingComponent>
      </div>
    </div>
  );
};

export default PageLayout;
