import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { MdDeleteForever, MdVerified } from 'react-icons/md';
import BigImageView from '@components/views/bigImageView';
import CommonAlert from '@components/common/commonAlert';
import type { TReturnPost } from 'src/types';
import { api } from '@utils/api';
import ReactTimeAgo from 'react-time-ago';
import PostViewText from '@components/views/postView/postViewText';
import PostViewInteractions from './postViewInteractions';
import PostViewDeleteMenu from './postViewDeleteMenu';
import { useRouter } from 'next/dist/client/router';

const PostView: FC<{
  data: TReturnPost;
  currentUserID: string;
  imagePrioriy?: boolean;
}> = ({ data, currentUserID, imagePrioriy = false }) => {
  const [showCopyShareLink, setShowCopyShareLink] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const router = useRouter();

  const authorAdmin = currentUserID === data.Author.id;

  const deleteQuery = api.post.delete.useMutation();

  const handleDelete = async () => {
    await deleteQuery.mutateAsync({ postId: data.id });
    setShowDeleteMenu(false);
    void router.push('/home');
  };

  return (
    <article className='group flex w-full gap-1 border-y border-themePrimary-100/20 p-2 text-themePrimary-50/95'>
      <div className='mr-2 h-12 min-h-[3rem] w-12 min-w-[3rem]'>
        <Link href={`/${data.Author.username}`} className='mt-1 h-12 w-12'>
          <Image
            priority={imagePrioriy}
            className='h-12 w-12 rounded-full object-cover'
            src={data.Author.image}
            alt={data.Author.name}
            width={100}
            height={100}></Image>
        </Link>
      </div>

      <div className='w-full'>
        <div className='relative flex items-center'>
          <Link href={`/${data.Author.username}`} className='flex items-center'>
            <span className='font-mukta text-themePrimary-50/95 hover:underline'>
              {data.Author.name}
            </span>
            &nbsp;
            {data.Author.authorVerified && (
              <span className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide group-hover/verified:block'>
                  This user is verified by the plex team.
                </span>
              </span>
            )}
            &nbsp;
            <span className='hidden font-ibmplex text-xs tracking-tight text-themePrimary-100/70 hover:underline sm:block'>
              @{data.Author.username}
            </span>
            &nbsp;
            <span className='text-2xl leading-none text-themePrimary-50/70'>
              ·
            </span>
            &nbsp;
            <span className='cursor-default font-ibmplex text-xs tracking-tighter text-themePrimary-100/70'>
              <ReactTimeAgo
                date={data.createdOn}
                timeStyle={'twitter'}></ReactTimeAgo>
            </span>
          </Link>

          {authorAdmin && (
            <button
              title='Delete Post'
              onClick={() =>
                setShowDeleteMenu((prevDeleteMenu) => !prevDeleteMenu)
              }
              className='absolute right-4 top-1/2 block rounded-full p-1 text-red-600 hover:bg-red-600 hover:text-themePrimary-50 group-hover:block sm:hidden'>
              <MdDeleteForever></MdDeleteForever>
            </button>
          )}
        </div>

        <span className='mb-2 block select-text whitespace-pre-line pr-8 font-mukta font-thin leading-none tracking-wide'>
          <PostViewText text={data.text}></PostViewText>
        </span>

        {data.image !== null && (
          <div className='select-none' onClick={() => setShowBigImage(true)}>
            <Image
              priority={imagePrioriy}
              className='max-h-[30rem] w-max cursor-pointer rounded-2xl border border-themePrimary-300/20 object-contain'
              width={800}
              height={800}
              src={data.image}
              alt={data.text}></Image>
          </div>
        )}

        <PostViewInteractions
          data={data}
          setShowCopyShareLink={(value: boolean) =>
            setShowCopyShareLink(value)
          }></PostViewInteractions>
      </div>

      <AnimatePresence>
        {showCopyShareLink && (
          <CommonAlert
            alertText='Copied link!'
            alertType='success'></CommonAlert>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBigImage && data.image !== null && (
          <BigImageView
            callBackFun={(_state: boolean) => setShowBigImage(_state)}
            imageUrl={data.image}></BigImageView>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {authorAdmin && showDeleteMenu && (
          <PostViewDeleteMenu
            setShowDeleteMenu={(value: boolean) => setShowDeleteMenu(value)}
            handleDelete={handleDelete}></PostViewDeleteMenu>
        )}
      </AnimatePresence>
    </article>
  );
};

export default PostView;
