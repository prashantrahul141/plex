import CommonAlert from '@components/common/commonAlert';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare } from 'react-icons/bi';

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
  const [postLikedState, setPostLiked] = useState(postLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [showCopyShareLink, setShowCopyShareLink] = useState(false);

  const handleLike = () => {
    setPostLiked(!postLikedState);
    setLikesCountState(likesCountState + (postLikedState ? -1 : 1));
  };

  return (
    <main className='flex w-full gap-1 text-themePrimary-50'>
      <div>
        <Image
          className='w-12 rounded-full'
          src={authorAvatar}
          alt={authorName}
          width={100}
          height={100}></Image>
      </div>

      <div className='w-full '>
        <header className='flex'>
          <h5>{authorName}</h5>&nbsp;
          <h6>@{authorUsername}</h6>&nbsp;·&nbsp;
          <h6>{postedDate.toString()}</h6>
        </header>

        <header className='mb-2'>{postText}</header>

        {postImage !== null && (
          <div className='select-none'>
            <Image
              className='rounded-2xl'
              width={1000}
              height={1000}
              src={postImage}
              alt={postText}></Image>
          </div>
        )}

        <div className='mt-2 flex select-none'>
          <button className='flex flex-grow items-center justify-center'>
            <span
              className='flex w-fit cursor-pointer items-center justify-center'
              onClick={handleLike}>
              {postLikedState && (
                <AiTwotoneHeart className='text-red-500'></AiTwotoneHeart>
              )}
              {!postLikedState && <AiOutlineHeart></AiOutlineHeart>}
              &nbsp;{likesCountState}
            </span>
          </button>

          <div className='flex flex-grow  items-center justify-center'>
            <button className='flex w-fit cursor-pointer items-center justify-center'>
              <BiCommentDetail></BiCommentDetail>&nbsp;{commentsCount}
            </button>
          </div>

          <div className='flex flex-grow items-center justify-center'>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `http://localhost:3000/${authorUsername}/${postId}`
                );
                setShowCopyShareLink(true);
                setTimeout(() => {
                  setShowCopyShareLink(false);
                }, 3000);
              }}
              className='w-fit cursor-pointer items-center justify-center'>
              <BiShare></BiShare>
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
    </main>
  );
};

export default PostView;
