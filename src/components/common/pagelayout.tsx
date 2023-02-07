import type { FC } from 'react';
import HeadComp from './headcomponent';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationsList from '@components/lists/notificationsList';
import PostList from '@components/lists/postsLists';
import BookmarksList from '@components/lists/bookmarksList';
import CreatePostForm from '@components/forms/createpostform';
import TrendingList from '@components/lists/trendingList';
import SettingsForm from '@components/forms/settingsform';
import TopBarNavigation from './topbarnavigation';
import { useSession } from 'next-auth/react';
import LoadingComponent from './loadingcomponent';

type pages =
  | 'home'
  | 'create'
  | 'trending'
  | 'notifications'
  | 'bookmarks'
  | 'settings'
  | 'profile';

const PageLayout: FC<{ title?: string; page: pages }> = ({ title, page }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <HeadComp headTitle={title}></HeadComp>
        <TopBarNavigation
          activeTab={page}
          authorAvatar={
            session.user.image || '/public/static/defaultAvatar.png'
          }
          authorName={session.user.name || 'user'}></TopBarNavigation>
        <AnimatePresence>
          <div className='relative'>
            <motion.div className='absolute'>
              {page === 'home' && <PostList></PostList>}
              {page === 'create' && <CreatePostForm></CreatePostForm>}
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
    );
  }
  return <LoadingComponent></LoadingComponent>;
};

export default PageLayout;
