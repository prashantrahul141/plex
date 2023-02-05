import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import BigImageView from './bigImageView';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MdVerified, MdLink, MdDateRange } from 'react-icons/md';

const ProfileView: FC<{
  authorBanner: string;
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  authorBio: string;
  authorJoinedon: string;
  authorUrl: string | null;
  authorFollowers: number;
  authorFollows: number;
  isAuthor: boolean;
  isVerified: boolean;
}> = ({
  authorBanner,
  authorAvatar,
  authorName,
  authorUsername,
  authorBio,
  authorJoinedon,
  authorUrl,
  authorFollowers,
  authorFollows,
  isAuthor,
  isVerified,
}) => {
  const [showBigImageAvatar, setShowBigImageAvatar] = useState(false);
  const [showBigImageBanner, setShowBigImageBanner] = useState(false);
  const urlHost = authorUrl ? new URL(authorUrl).hostname : '';

  return (
    <main className='w-full max-w-fit'>
      <header className='relative'>
        <Image
          className='select-none'
          onClick={() => {
            setShowBigImageBanner(true);
          }}
          src={authorBanner}
          width={1000}
          height={1000}
          alt='Banner'></Image>
        <Image
          onClick={() => {
            setShowBigImageAvatar(true);
          }}
          className='absolute -bottom-12 left-2  w-24 select-none rounded-full border-[5px] border-baseBackground-100 sm:w-28'
          src={authorAvatar}
          width={200}
          height={200}
          alt={authorName}></Image>
        {isAuthor && (
          <Link href='/profile/edit'>
            <button className='btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3  font-mukta text-sm '>
              Edit profile
            </button>
          </Link>
        )}
        {!isAuthor && (
          <button className='btn absolute -bottom-12 right-2 w-fit rounded-3xl px-3  font-mukta text-sm '>
            Follow
          </button>
        )}
      </header>

      <header className='mt-16 ml-4'>
        <span className='flex items-center font-mukta text-xl text-themePrimary-100 sm:text-2xl'>
          {authorName}&nbsp;
          {isVerified && (
            <span className='group/verified relative'>
              <MdVerified></MdVerified>
              <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md border border-none bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50/90 group-hover/verified:block'>
                This user is verified by the plex team.
              </span>
            </span>
          )}
        </span>

        <span className='mb-6 block font-ibmplex text-sm leading-none text-themePrimary-50/50'>
          @{authorUsername}
        </span>

        <span className='mb-1 block font-mukta font-thin leading-none text-themePrimary-50/95'>
          {authorBio}
        </span>

        <h6 className='flex flex-col sm:flex-row sm:gap-2'>
          {authorUrl !== null && (
            <Link
              passHref={true}
              target='_blank'
              href={authorUrl}
              className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50 hover:text-themePrimary-200 hover:underline'>
              <MdLink></MdLink>
              {urlHost}
            </Link>
          )}

          <span className='flex w-fit items-center gap-1 font-mukta font-thin text-themePrimary-50/50'>
            <MdDateRange></MdDateRange>
            Joined {authorJoinedon}
          </span>
        </h6>

        <h6 className='flex items-center gap-4'>
          <span className='flex items-baseline gap-1'>
            <span className='font-ibmplex font-bold leading-none text-themePrimary-50'>
              {authorFollowers}
            </span>
            <span className='font-mukta text-sm font-thin tracking-wider text-themePrimary-50/60'>
              Followers
            </span>
          </span>

          <span className='flex items-baseline gap-1'>
            <span className='font-ibmplex font-bold leading-none text-themePrimary-50'>
              {authorFollows}
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
            imageUrl={authorAvatar}
            callBackFun={(_state: boolean) => setShowBigImageAvatar(_state)}
            width={200}></BigImageView>
        )}
        {showBigImageBanner && (
          <BigImageView
            imageUrl={authorBanner}
            callBackFun={(_state: boolean) =>
              setShowBigImageBanner(_state)
            }></BigImageView>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProfileView;
