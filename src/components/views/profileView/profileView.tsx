import Image from 'next/image';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BigImageView from '@components/views/bigImageView';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MdVerified, MdLink, MdDateRange } from 'react-icons/md';
import type { IReturnUser } from 'src/types';
import { api } from '@utils/api';
import ProfileViewBio from '@components/views/profileView/profileViewBio';
import getMonthStr from '@utils/utils';

const ProfileView: FC<{ data: IReturnUser }> = ({ data }) => {
  const [showBigImageAvatar, setShowBigImageAvatar] = useState(false);
  const [showBigImageBanner, setShowBigImageBanner] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingState, setFollwingState] = useState(
    data.foundUser?.followers.length
      ? data.foundUser.followers.length > 0
      : false
  );
  const followQuery = api.user.follow.useQuery(
    {
      addFollow: !followingState,
      followId: data.foundUser?.id || '#',
    },
    { enabled: false }
  );
  const followHandle = async () => {
    setFollwingState((prevState) => !prevState);
    setFollowersCount((prevCount) => prevCount + (followingState ? -1 : 1));
    await followQuery.refetch();
  };

  useEffect(() => {
    if (data.foundUser !== null) {
      setFollowersCount(data.foundUser._count.followers);
    }
  }, [data.foundUser]);

  if (data.foundUser !== null) {
    const urlHost = data.foundUser.url
      ? new URL(data.foundUser.url).hostname
      : '';

    return (
      <main className='w-full max-w-fit border-b border-themePrimary-100/40 pb-5'>
        <header className='relative'>
          <Image
            priority={true}
            className='max-h-64 min-w-full cursor-pointer select-none bg-baseBackground-200/50 object-contain'
            onClick={() => {
              setShowBigImageBanner(true);
            }}
            src={data.foundUser.banner}
            width={1000}
            height={1000}
            alt='Banner'></Image>

          <Image
            onClick={() => {
              setShowBigImageAvatar(true);
            }}
            priority={true}
            className='absolute left-2 -bottom-12 h-32 w-32 cursor-pointer rounded-full border-[5px] border-baseBackground-100 object-cover'
            src={data.foundUser.image}
            width={200}
            height={200}
            alt={'Profile picture'}></Image>

          {data.isAuthor && (
            <Link href='/profile/edit'>
              <button className='btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3  font-mukta text-sm '>
                Edit profile
              </button>
            </Link>
          )}
          {!data.isAuthor && (
            <button
              onClick={async () => followHandle()}
              className={`btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3 font-mukta text-sm ${
                !followingState
                  ? 'bg-themePrimary-400/90 text-themePrimary-50/95 hover:bg-themePrimary-400'
                  : ''
              }`}>
              {followingState ? 'Following' : 'Follow'}
            </button>
          )}
        </header>

        <header className='mt-16 ml-4'>
          <span className='flex items-center font-mukta text-xl text-themePrimary-100 sm:text-2xl'>
            {data.foundUser.name}&nbsp;
            {data.foundUser.authorVerified && (
              <span className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-12 top-6 z-50 hidden w-max -translate-x-1/2 rounded-md border border-none bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50/90 group-hover/verified:block'>
                  This user is verified by the plex team.
                </span>
              </span>
            )}
          </span>

          <span className='mb-6 block font-ibmplex text-sm leading-none text-themePrimary-50/50'>
            @{data.foundUser.username}
          </span>

          <ProfileViewBio bioText={data.foundUser.bio}></ProfileViewBio>

          <h6 className='flex flex-col sm:flex-row sm:gap-2'>
            {data.foundUser.url !== null && data.foundUser.url !== '' && (
              <Link
                passHref={true}
                target='_blank'
                href={data.foundUser.url}
                className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50'>
                <MdLink></MdLink>
                <span className='text-themePrimary-300 hover:underline'>
                  {urlHost}
                </span>
              </Link>
            )}

            <span className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50'>
              <MdDateRange></MdDateRange>
              Joined {getMonthStr(data.foundUser.joinedOn.getMonth())}{' '}
              {data.foundUser.joinedOn.getFullYear()}
            </span>
          </h6>

          <h6 className='flex items-center gap-4'>
            <Link
              href={
                data.isAuthor
                  ? '/profile/followers'
                  : `/${data.foundUser.username}/followers`
              }
              className='group/follows flex items-baseline gap-1 text-sm'>
              <span className='font-ibmplex  font-bold leading-none text-themePrimary-50'>
                {followersCount}
              </span>
              <span className='font-mukta font-thin tracking-wider text-themePrimary-50/60 group-hover/follows:underline'>
                Followers
              </span>
            </Link>

            <Link
              href={
                data.isAuthor
                  ? '/profile/followings'
                  : `/${data.foundUser.username}/followings`
              }
              className='group/follows flex items-baseline gap-1 text-sm'>
              <span className='font-ibmplex font-bold leading-none text-themePrimary-50'>
                {data.foundUser._count.followings}
              </span>
              <span className='font-mukta font-thin tracking-wider text-themePrimary-50/60 group-hover/follows:underline'>
                Followings
              </span>
            </Link>
          </h6>
        </header>

        <AnimatePresence>
          {showBigImageAvatar && (
            <BigImageView
              imageUrl={data.foundUser.image}
              callBackFun={(_state: boolean) => setShowBigImageAvatar(_state)}
              width={500}></BigImageView>
          )}
          {showBigImageBanner && (
            <BigImageView
              imageUrl={data.foundUser.banner}
              callBackFun={(_state: boolean) =>
                setShowBigImageBanner(_state)
              }></BigImageView>
          )}
        </AnimatePresence>
      </main>
    );
  } else {
    return <></>;
  }
};

export default ProfileView;
