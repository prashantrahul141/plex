import type { FC } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationsList from '@components/lists/notificationsList';
import PostList from '@components/lists/postsList';
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
import EditProfileForm from '@components/forms/editprofile/editprofileform';
import FollowsViewOnProfile from '@components/views/Follows/followsViewOnProfile';
import FollowsVIewOnUser from '@components/views/Follows/followsViewOnUser';
import OpenPost from '@components/views/openPost';

type pages =
  | 'home'
  | 'trending'
  | 'notifications'
  | 'bookmarks'
  | 'settings'
  | 'profile'
  | 'user'
  | 'edit profile'
  | 'followers profile'
  | 'followings profile'
  | 'followers user'
  | 'followings user'
  | 'post';

const PageLayout: FC<{ page: pages }> = ({ page }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [layoutTitle, setLayoutTitle] = useState('');

  if (status === 'authenticated') {
    return (
      <div className='mx-auto flex h-screen w-screen flex-col gap-0 sm:w-max sm:flex-row'>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.1 }}
            key={0}
            className='max-w-lg overflow-auto sm:min-w-[40rem] md:border-r md:border-themePrimary-100/40'>
            <h2
              key={1}
              className={`hidden border-b border-themePrimary-100/40 px-3 py-4 font-mukta text-2xl tracking-wide text-themePrimary-50/90 sm:block ${
                !['user', 'profile'].includes(page) ? `capitalize` : ``
              }`}>
              {['user', 'profile'].includes(page) ? layoutTitle : page}
            </h2>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '90%' }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              key={2}
              className='h-[90%] sm:overflow-auto'>
              {page === 'home' && (
                <PostList authorId={session.user.id}></PostList>
              )}

              {page === 'trending' && <TrendingList key={3}></TrendingList>}
              {page === 'notifications' && (
                <NotificationsList key={4}></NotificationsList>
              )}
              {page === 'bookmarks' && (
                <BookmarksList
                  key={5}
                  authorId={session.user.id}></BookmarksList>
              )}
              {page === 'settings' && <SettingsForm key={6}></SettingsForm>}

              {page === 'profile' && (
                <UserProfileView
                  key={7}
                  setLayoutTitleCallback={(target: string) =>
                    setLayoutTitle(target)
                  }
                  isCurrentUser={true}
                  session={session}></UserProfileView>
              )}
              {page === 'edit profile' && (
                <EditProfileForm key={8}></EditProfileForm>
              )}

              {page === 'user' && (
                <UserProfileView
                  key={9}
                  setLayoutTitleCallback={(target: string) =>
                    setLayoutTitle(target)
                  }
                  isCurrentUser={false}
                  session={session}></UserProfileView>
              )}

              {page === 'followers profile' && (
                <FollowsViewOnProfile
                  key={10}
                  page='followers'></FollowsViewOnProfile>
              )}

              {page === 'followings profile' && (
                <FollowsViewOnProfile
                  key={11}
                  page='followings'></FollowsViewOnProfile>
              )}

              {page === 'followers user' && (
                <FollowsVIewOnUser
                  key={12}
                  page='followers'></FollowsVIewOnUser>
              )}

              {page === 'followings user' && (
                <FollowsVIewOnUser
                  key={13}
                  page='followings'></FollowsVIewOnUser>
              )}
              {page === 'post' && (
                <OpenPost key={13} session={session}></OpenPost>
              )}
            </motion.div>
          </motion.div>
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
