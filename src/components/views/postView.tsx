import CommonAlert from '@components/common/commonAlert';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare } from 'react-icons/bi';
import { SlOptions } from 'react-icons/sl';
import BigImageView from './bigImageView';
import { MdDeleteForever, MdVerified } from 'react-icons/md';

const PostView: FC<{
  postId: string;
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  authorVerified: boolean;
  postedDate: string;
  postText: string;
  postImage: string | null;
  likesCount: number;
  postLiked: boolean;
  commentsCount: number;
  authorAdmin: boolean;
}> = ({
  postId,
  authorAvatar,
  authorName,
  authorUsername,
  authorVerified,
  postedDate,
  postText,
  postImage,
  likesCount,
  postLiked,
  commentsCount,
  authorAdmin,
}) => {
  const [postLikedState, setPostLiked] = useState(postLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [showCopyShareLink, setShowCopyShareLink] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);
  const [showHamMenuOptions, setShowHamMenuOptions] = useState(false);

  const handleLike = () => {
    setPostLiked(!postLikedState);
    setLikesCountState(likesCountState + (postLikedState ? -1 : 1));
  };

  return (
    <div className='flex w-full gap-1 text-themePrimary-50/95'>
      <div>
        <Link href={`/${authorUsername}`} className='mr-1 w-fit'>
          <Image
            className='mt-1 w-14 min-w-[48px] rounded-full'
            src={authorAvatar}
            alt={authorName}
            width={100}
            height={100}></Image>
        </Link>
      </div>

      <div className='group w-full'>
        <div className='relative flex'>
          <Link href={`/${authorUsername}`} className='flex items-center'>
            <h5 className='font-mukta text-themePrimary-50/95 hover:underline'>
              {authorName}
            </h5>
            &nbsp;
            {authorVerified && (
              <h6 className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-1/2 top-6 hidden w-28 -translate-x-1/2 rounded-md bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide group-hover/verified:block'>
                  This user this verified by the plex team.
                </span>
              </h6>
            )}
            &nbsp;
            <h6 className='font-ibmplex text-xs tracking-tight text-themePrimary-100/70 hover:underline'>
              @{authorUsername}
            </h6>
            &nbsp;
            <span className='text-2xl leading-none text-themePrimary-50/95'>
              ·
            </span>
            &nbsp;
            <h6 className='cursor-default font-ibmplex text-xs tracking-tighter text-themePrimary-100/70'>
              {postedDate.toString()}
            </h6>
          </Link>

          {authorAdmin && (
            <button
              onClick={() => setShowHamMenuOptions(!showHamMenuOptions)}
              className='absolute right-4 top-1/2 hidden rounded-full p-2 hover:bg-themePrimary-50/10 group-hover:block'>
              <SlOptions></SlOptions>
            </button>
          )}
          <AnimatePresence>
            {authorAdmin && showHamMenuOptions && (
              <>
                <div
                  onClick={() => setShowHamMenuOptions(false)}
                  className='fixed top-0 left-0 h-screen w-screen'></div>
                <motion.div
                  initial={{ top: 10, right: -20, scale: 0, opacity: 0 }}
                  animate={{ top: 30, right: 20, scale: 1, opacity: 1 }}
                  exit={{ top: 10, right: -20, scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 0.3,
                  }}
                  className='absolute z-10 rounded-md border border-themePrimary-300/50 py-1 text-themePrimary-50/80 backdrop-blur-[2px] backdrop-brightness-90'>
                  <button className='group/btn flex items-center justify-center py-1 px-2 font-mukta text-base font-light leading-none tracking-wide hover:bg-red-500/80 hover:text-themePrimary-50'>
                    <MdDeleteForever className=' group-hover/btn:text-themePrimary-50'></MdDeleteForever>
                    &nbsp; Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <Link
          href={`/${authorUsername}/${postId}`}
          className='mb-2 block font-mukta font-thin leading-snug tracking-wide'>
          {postText}
        </Link>

        {postImage !== null && (
          <div className='select-none' onClick={() => setShowBigImage(true)}>
            <Image
              className='rounded-2xl'
              width={1000}
              height={1000}
              src={postImage}
              alt={postText}></Image>
          </div>
        )}

        <div className='mt-2 flex select-none font-ibmplex text-sm leading-none text-themePrimary-50/70'>
          <button className='flex flex-grow cursor-default items-center justify-center'>
            <span
              className='flex w-fit cursor-pointer items-center justify-center hover:text-themePrimary-50'
              onClick={handleLike}>
              {postLikedState && (
                <AiTwotoneHeart className='text-xl text-red-500 sm:text-2xl'></AiTwotoneHeart>
              )}
              {!postLikedState && (
                <AiOutlineHeart className='text-xl sm:text-2xl'></AiOutlineHeart>
              )}
              &nbsp;{likesCountState}
            </span>
          </button>

          <div className='flex flex-grow  items-center justify-center'>
            <Link
              href={`${authorUsername}/${postId}`}
              className='flex w-fit cursor-pointer items-center justify-center hover:text-themePrimary-50'>
              <BiCommentDetail className='text-xl sm:text-2xl'></BiCommentDetail>
              &nbsp;
              {commentsCount}
            </Link>
          </div>

          <div className='flex flex-grow items-center justify-center'>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  typeof window !== 'undefined'
                    ? `${window.location.host}/${authorUsername}/${postId}`
                    : '/'
                );
                setShowCopyShareLink(true);
                setTimeout(() => {
                  setShowCopyShareLink(false);
                }, 3000);
              }}
              className='w-fit cursor-pointer items-center justify-center hover:text-themePrimary-50'>
              <BiShare className='text-xl sm:text-2xl'></BiShare>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCopyShareLink && (
          <CommonAlert
            alertText='Copied post link!'
            alertType='success'></CommonAlert>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBigImage && postImage !== null && (
          <BigImageView
            callBackFun={(_state: boolean) => setShowBigImage(_state)}
            imageUrl={postImage}></BigImageView>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostView;
