import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import BigImageView from './bigImageView';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MdVerified, MdLink, MdDateRange } from 'react-icons/md';
import type { IReturnUser } from 'src/types';

const ProfileView: FC<{ data: IReturnUser }> = ({ data }) => {
  const [showBigImageAvatar, setShowBigImageAvatar] = useState(false);
  const [showBigImageBanner, setShowBigImageBanner] = useState(false);
  const urlHost = data.foundUser?.url
    ? new URL(data.foundUser?.url).hostname
    : '';

  if (data.foundUser !== null) {
    return (
      <main className='w-full max-w-fit'>
        <header className='relative'>
          <Image
            className='h-60 select-none'
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
            className='absolute -bottom-12 left-2  w-24 select-none rounded-full border-[5px] border-baseBackground-100 sm:w-28'
            src={data.foundUser.image}
            width={200}
            height={200}
            alt={data.foundUser.image}></Image>
          {data.isAuthor && (
            <Link href='/profile/edit'>
              <button className='btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3  font-mukta text-sm '>
                Edit profile
              </button>
            </Link>
          )}
          {!data.isAuthor && (
            <button className='btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3  font-mukta text-sm '>
              {false ? 'Following' : 'Follow'}
              {/* {isFollowed ? 'Following' : 'Follow'} */}
            </button>
          )}
        </header>

        <header className='mt-16 ml-4'>
          <span className='flex items-center font-mukta text-xl text-themePrimary-100 sm:text-2xl'>
            {data.foundUser.name}&nbsp;
            {data.foundUser.authorVerified && (
              <span className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md border border-none bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50/90 group-hover/verified:block'>
                  This user is verified by the plex team.
                </span>
              </span>
            )}
          </span>

          <span className='mb-6 block font-ibmplex text-sm leading-none text-themePrimary-50/50'>
            @{data.foundUser.username}
          </span>

          <span className='mb-1 block font-mukta font-thin leading-none text-themePrimary-50/95'>
            {data.foundUser.bio}
          </span>

          <h6 className='flex flex-col sm:flex-row sm:gap-2'>
            {data.foundUser.url !== null && (
              <Link
                passHref={true}
                target='_blank'
                href={data.foundUser.url}
                className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50 hover:text-themePrimary-200 hover:underline'>
                <MdLink></MdLink>
                {urlHost}
              </Link>
            )}

            <span className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50'>
              <MdDateRange></MdDateRange>
              Joined {data.foundUser.joinedOn.toDateString()}
            </span>
          </h6>

          <h6 className='flex items-center gap-4'>
            <span className='flex items-baseline gap-1'>
              <span className='font-ibmplex font-bold leading-none text-themePrimary-50'>
                {data.foundUser._count.followers}
              </span>
              <span className='font-mukta text-sm font-thin tracking-wider text-themePrimary-50/60'>
                Followers
              </span>
            </span>

            <span className='flex items-baseline gap-1'>
              <span className='font-ibmplex font-bold leading-none text-themePrimary-50'>
                {data.foundUser._count.followings}
              </span>
              <span className='font-mukta font-thin tracking-wider  text-themePrimary-50/60'>
                Follows
              </span>
            </span>
          </h6>
        </header>

        <AnimatePresence>
          {showBigImageAvatar && (
            <BigImageView
              imageUrl={data.foundUser.image}
              callBackFun={(_state: boolean) => setShowBigImageAvatar(_state)}
              width={200}></BigImageView>
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
