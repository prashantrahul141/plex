import CommonAlert from '@components/common/commonAlert';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare } from 'react-icons/bi';
import BigImageView from './bigImageView';

const PostView: FC<{
  postId: string;
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
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
  postedDate,
  postText,
  postImage,
  likesCount,
  postLiked,
  commentsCount,
  authorAdmin,
}) => {
  const iconSize = 24;
  const [postLikedState, setPostLiked] = useState(postLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [showCopyShareLink, setShowCopyShareLink] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);

  const handleLike = () => {
    setPostLiked(!postLikedState);
    setLikesCountState(likesCountState + (postLikedState ? -1 : 1));
  };

  return (
    <div className='flex w-full gap-1 text-themePrimary-50'>
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

      <div className='w-full '>
        <Link href={`/${authorUsername}`} className='flex items-center'>
          <h5 className='font-mukta text-themePrimary-50/95 hover:underline'>
            {authorName}
          </h5>
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

        <div className='mt-2 flex select-none font-ibmplex text-sm leading-none'>
          <button className='flex flex-grow cursor-default items-center justify-center'>
            <span
              className='flex w-fit cursor-pointer items-center justify-center'
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
            <button className='flex w-fit cursor-pointer items-center justify-center'>
              <BiCommentDetail className='text-xl sm:text-2xl'></BiCommentDetail>
              &nbsp;
              {commentsCount}
            </button>
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
              className='w-fit cursor-pointer items-center justify-center'>
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
