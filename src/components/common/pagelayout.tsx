import type { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationsList from '@components/lists/notificationsList';
import PostList from '@components/lists/postsLists';
import BookmarksList from '@components/lists/bookmarksList';
import TrendingList from '@components/lists/trendingList';
import SettingsForm from '@components/forms/settingsform';
import TopBarNavigation from '@components/common/topbarnavigation';
import { useSession } from 'next-auth/react';
import SideBarNavigation from '@components/common/sidebarnavigation';
import { useRouter } from 'next/router';
import LoadingComponent from '@components/common/loadingcomponent';
import AdditionalWidgets from '@components/common/additionalWidgets';
import UserProfileView from '@components/views/userProfileVIew';

type pages =
  | 'home'
  | 'trending'
  | 'notifications'
  | 'bookmarks'
  | 'settings'
  | 'profile'
  | 'user';

const PageLayout: FC<{ page: pages }> = ({ page }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    return (
      <div className='mx-auto flex h-screen w-screen flex-col gap-2 sm:w-max sm:flex-row sm:gap-0'>
        <div className='z-50 block w-full min-w-max sm:hidden'>
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
          <div className='max-w-2xl overflow-auto  sm:min-w-[42rem] md:border-r md:border-themePrimary-100/40'>
            <h2 className='mx-3 my-4 hidden font-mukta text-2xl capitalize text-themePrimary-50/80 sm:block'>
              {page}
            </h2>
            <motion.div>
              {page === 'home' && (
                <PostList authorId={session.user.id}></PostList>
              )}

              {page === 'trending' && <TrendingList></TrendingList>}
              {page === 'notifications' && (
                <NotificationsList></NotificationsList>
              )}
              {page === 'bookmarks' && <BookmarksList></BookmarksList>}
              {page === 'settings' && <SettingsForm></SettingsForm>}

              {page === 'profile' && (
                <UserProfileView
                  isCurrentUser={true}
                  session={session}></UserProfileView>
              )}
              {page === 'user' && (
                <UserProfileView
                  isCurrentUser={false}
                  session={session}></UserProfileView>
              )}
            </motion.div>
          </div>
        </AnimatePresence>
        <div className='hidden lg:block'>
          <AdditionalWidgets></AdditionalWidgets>
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
