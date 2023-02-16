import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { SlOptions } from 'react-icons/sl';
import { BiCommentDetail, BiShare } from 'react-icons/bi';
import { MdDeleteForever, MdVerified } from 'react-icons/md';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { CiBookmarkPlus } from 'react-icons/ci';
import BigImageView from './bigImageView';
import CommonAlert from '@components/common/commonAlert';
import type { IReturnPost } from 'src/types';
import { env } from 'src/env/client.mjs';
import { api } from '@utils/api';

const PostView: FC<{ data: IReturnPost; currentUserID: string }> = ({
  data,
  currentUserID,
}) => {
  const postImageLink = `https://res.cloudinary.com/${
    env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
  }/image/upload/${data.post.image || '#'}`;

  const [postLikedState, setPostLiked] = useState(
    data.post.LikedByAuthor.length > 0
  );
  const [likesCountState, setLikesCountState] = useState(
    data.post._count.LikedByAuthor
  );
  const [bookmarkedState, setBookmarkedState] = useState(
    data.post.BookmarkedByAuthor.length > 0
  );
  const [showCopyShareLink, setShowCopyShareLink] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);
  const [showHamMenuOptions, setShowHamMenuOptions] = useState(false);
  const authorAdmin = currentUserID === data.post.Author.id;
  const likeQuery = api.post.like.useMutation();
  const bookmarkQuery = api.post.bookMark.useMutation();

  const handleLike = async () => {
    setPostLiked(!postLikedState);
    setLikesCountState(likesCountState + (postLikedState ? -1 : 1));
    await likeQuery.mutateAsync({
      addLike: !postLikedState,
      postId: data.post.id,
    });
  };

  const handleBookmark = async () => {
    setBookmarkedState(!bookmarkedState);
    await bookmarkQuery.mutateAsync({
      addBookmark: !bookmarkedState,
      postId: data.post.id,
    });
  };

  return (
    <div className='outline-theme group flex w-full gap-1 p-2 text-themePrimary-50/95 outline outline-1 outline-themePrimary-100/20'>
      <div className='mr-2'>
        <Link href={`/${data.post.Author.username}`} className='w-fit'>
          <Image
            className='mt-1 h-12 min-h-[2.7rem] w-12 min-w-[2.7rem] rounded-full object-cover'
            src={data.post.Author.image}
            alt={data.post.Author.name}
            width={100}
            height={100}></Image>
        </Link>
      </div>

      <div className=' w-full'>
        <div className='relative flex items-center'>
          <Link
            href={`/${data.post.Author.username}`}
            className='flex items-center'>
            <h5 className='font-mukta text-themePrimary-50/95 hover:underline'>
              {data.post.Author.name}
            </h5>
            &nbsp;
            {data.post.Author.authorVerified && (
              <h6 className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide group-hover/verified:block'>
                  This user is verified by the plex team.
                </span>
              </h6>
            )}
            &nbsp;
            <h6 className='font-ibmplex text-xs tracking-tight text-themePrimary-100/70 hover:underline'>
              @{data.post.Author.username}
            </h6>
            &nbsp;
            <span className='text-2xl leading-none text-themePrimary-50/70'>
              ·
            </span>
            &nbsp;
            <h6 className='cursor-default font-ibmplex text-xs tracking-tighter text-themePrimary-100/70'>
              {data.post.createdOn.toDateString()}
            </h6>
          </Link>

          {authorAdmin && (
            <button
              onClick={() => setShowHamMenuOptions(!showHamMenuOptions)}
              className='absolute right-4 top-1/2 block rounded-full px-2 hover:bg-themePrimary-50/10 group-hover:block sm:hidden'>
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
                  className='absolute z-10 rounded-md border border-themePrimary-300/50 bg-baseBackground-100/95 py-1 text-themePrimary-50/80'>
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
          href={`/${data.post.Author.username}/${data.post.id}`}
          className='mb-2 block select-text font-mukta font-thin leading-snug tracking-wide'>
          {data.post.text}
        </Link>

        {data.post.image !== null && (
          <div className='select-none' onClick={() => setShowBigImage(true)}>
            <Image
              className='max-h-[30rem] w-max rounded-2xl border border-themePrimary-300/20 object-contain'
              width={800}
              height={800}
              src={postImageLink}
              alt={data.post.text}></Image>
          </div>
        )}

        <div className='flex select-none pt-1 font-ibmplex text-sm leading-none text-themePrimary-50/70'>
          <div className='flex flex-grow items-center justify-center'>
            <button
              className='group/icon flex w-fit cursor-pointer items-center justify-center hover:text-red-500'
              onClick={handleLike}
              title='Like'>
              <span className=' flex w-fit cursor-pointer items-center justify-center  rounded-full p-1 hover:bg-red-500/20  group-hover/icon:bg-red-500/20'>
                {postLikedState && (
                  <AiTwotoneHeart className='text-lg text-red-500'></AiTwotoneHeart>
                )}
                {!postLikedState && (
                  <AiOutlineHeart className='text-lg'></AiOutlineHeart>
                )}
              </span>
              &nbsp;{likesCountState}
            </button>
          </div>

          <div className='flex flex-grow  items-center justify-center'>
            <Link
              title='Comments'
              href={`${data.post.Author.username}/${data.post.id}`}
              className='group/icon flex w-fit cursor-pointer items-center justify-center hover:text-themePrimary-300'>
              <span className='rounded-full p-1 text-lg group-hover/icon:bg-themePrimary-300/10'>
                <BiCommentDetail className=''></BiCommentDetail>
              </span>
              &nbsp;
              {data.post._count.Comments}
            </Link>
          </div>

          <div className='flex flex-grow items-center justify-center'>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  typeof window !== 'undefined'
                    ? `${window.location.host}/${data.post.Author.username}/${data.post.id}`
                    : '/'
                );
                setShowCopyShareLink(true);
                setTimeout(() => {
                  setShowCopyShareLink(false);
                }, 3000);
              }}
              title='Share'
              className='w-fit cursor-pointer  items-center justify-center rounded-full p-1 text-lg hover:bg-green-300/10  hover:text-green-400'>
              <BiShare className='text-lg'></BiShare>
            </button>
          </div>

          <div className='flex flex-grow items-center justify-center'>
            <button
              onClick={handleBookmark}
              className='rounded-full p-1 text-lg hover:bg-themePrimary-300/10 hover:text-themePrimary-300'
              title='Bookmark'>
              {bookmarkedState && (
                <BsBookmarkCheckFill className='text-[0.9rem]'></BsBookmarkCheckFill>
              )}
              {!bookmarkedState && (
                <CiBookmarkPlus className=' '></CiBookmarkPlus>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCopyShareLink && (
          <CommonAlert
            alertText='Copied link!'
            alertType='success'></CommonAlert>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBigImage && data.post.image !== null && (
          <BigImageView
            callBackFun={(_state: boolean) => setShowBigImage(_state)}
            imageUrl={postImageLink}></BigImageView>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostView;
