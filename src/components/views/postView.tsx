import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { SlOptions } from 'react-icons/sl';
import { BiCommentDetail, BiShare } from 'react-icons/bi';
import { MdDeleteForever, MdVerified } from 'react-icons/md';
import { BsBookmarkCheckFill, BsBookmarkHeart } from 'react-icons/bs';
import BigImageView from '@components/views/bigImageView';
import CommonAlert from '@components/common/commonAlert';
import type { IReturnPost } from 'src/types';
import { env } from 'src/env/client.mjs';
import { api } from '@utils/api';
import ReactTimeAgo from 'react-time-ago';
import { useRouter } from 'next/router';
import { AiFillCloseCircle } from 'react-icons/ai';

const PostView: FC<{ data: IReturnPost; currentUserID: string }> = ({
  data,
  currentUserID,
}) => {
  const postImageLink = `https://res.cloudinary.com/${
    env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
  }/image/upload/${data.post.image || '#'}`;

  const router = useRouter();

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
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const authorAdmin = currentUserID === data.post.Author.id;

  const likeQuery = api.post.like.useMutation();
  const bookmarkQuery = api.post.bookMark.useMutation();
  const deleteQuery = api.post.delete.useMutation();

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

  const handleDelete = async () => {
    await deleteQuery.mutateAsync({ postId: data.post.id });
    setShowDeleteMenu(false);
  };

  return (
    <article className='group flex w-full gap-1 border-y border-themePrimary-100/20 p-2 text-themePrimary-50/95'>
      <div className='mr-2 h-12 min-h-[3rem] w-12 min-w-[3rem]'>
        <Link href={`/${data.post.Author.username}`} className='mt-1 h-12 w-12'>
          <Image
            className='h-12 w-12 rounded-full object-cover'
            src={data.post.Author.image}
            alt={data.post.Author.name}
            width={100}
            height={100}></Image>
        </Link>
      </div>

      <div className='w-full'>
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
              <ReactTimeAgo
                date={data.post.createdOn}
                timeStyle={'twitter'}></ReactTimeAgo>
            </h6>
          </Link>

          {authorAdmin && (
            <button
              title='Post Menu'
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
                  key={0}
                  initial={{ top: 10, right: -20, scale: 0, opacity: 0 }}
                  animate={{ top: 30, right: 20, scale: 1, opacity: 1 }}
                  exit={{ top: 10, right: -20, scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 0.3,
                  }}
                  className='absolute z-10 rounded-md border border-themePrimary-300/50 bg-baseBackground-100 py-1 text-themePrimary-50/80'>
                  <button
                    onClick={() => setShowDeleteMenu(true)}
                    className='group/btn flex items-center justify-center py-1 px-2 font-mukta text-base font-light leading-none tracking-wide hover:bg-red-500/80 hover:text-themePrimary-50'>
                    <MdDeleteForever className=' group-hover/btn:text-themePrimary-50'></MdDeleteForever>
                    &nbsp; Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {authorAdmin && showDeleteMenu && (
              <>
                <motion.div
                  key={1}
                  onClick={() => setShowDeleteMenu(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.1,
                  }}
                  className='fixed top-0 left-0 z-10 h-screen w-screen backdrop-brightness-75'></motion.div>

                <motion.div
                  key={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, translateX: '-50%' }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 0.3,
                  }}
                  className='absolute top-0 left-1/2 z-20 h-max w-60 rounded-md border border-themePrimary-300/50 bg-baseBackground-100 py-4 text-themePrimary-50/80'>
                  <header className='flex h-fit w-full px-4'>
                    <h2 className='flex-grow text-center font-mukta text-base tracking-wide text-themePrimary-50/95'></h2>

                    <AiFillCloseCircle
                      title='close'
                      className='h-5 w-5 cursor-pointer text-base text-red-400 hover:text-red-500'
                      onClick={() =>
                        setShowDeleteMenu(false)
                      }></AiFillCloseCircle>
                  </header>
                  <main className='h-max w-full px-2'>
                    <div className='mx-2 my-4 mb-8 text-center'>
                      <span className='font-mukta font-thin leading-none text-themePrimary-50'>
                        Are you sure you want to permanently delete this post?
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        className='btn py-1'
                        onClick={() => setShowDeleteMenu(false)}>
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className='btn border-none bg-red-500/90 py-1 text-themePrimary-50/95 hover:bg-red-500'>
                        <span className='mx-auto flex items-center justify-center'>
                          <MdDeleteForever></MdDeleteForever>Delete
                        </span>
                      </button>
                    </div>
                  </main>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <span
          onClick={() =>
            void router.push(`/${data.post.Author.username}/${data.post.id}`)
          }
          className='mb-2 block select-text whitespace-pre-line font-mukta font-thin leading-none tracking-wide'>
          {data.post.text}
        </span>

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
              className='h-6 w-6 rounded-full p-1 text-lg hover:bg-themePrimary-300/10 hover:text-themePrimary-300'
              title='Bookmark'>
              {bookmarkedState && <BsBookmarkCheckFill></BsBookmarkCheckFill>}
              {!bookmarkedState && <BsBookmarkHeart></BsBookmarkHeart>}
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
    </article>
  );
};

export default PostView;
