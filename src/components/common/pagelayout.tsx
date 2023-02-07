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

type pages =
  | 'home'
  | 'trending'
  | 'notifications'
  | 'bookmarks'
  | 'settings'
  | 'profile';

const PageLayout: FC<{ page: pages }> = ({ page }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <>
        <div className='flex w-full flex-col gap-2 sm:flex-row sm:gap-0'>
          <div className='z-50 w-full sm:hidden'>
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
        </div>
        <div></div>
      </>
    );
  } else {
    void router.push('/');
  }
  return <></>;
};

export default PageLayout;
