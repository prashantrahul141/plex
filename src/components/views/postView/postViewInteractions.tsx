import type { FC } from 'react';
import { useState } from 'react';
import { BsBookmarkCheckFill, BsBookmarkHeart } from 'react-icons/bs';
import { BiCommentDetail, BiShare } from 'react-icons/bi';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { api } from '@utils/api';
import type { TReturnPost } from 'src/types';
import Link from 'next/link';

const PostViewInteractions: FC<{
  data: TReturnPost;
  setShowCopyShareLink: (value: boolean) => void;
}> = ({ data, setShowCopyShareLink }) => {
  const likeQuery = api.post.like.useMutation();
  const bookmarkQuery = api.post.bookMark.useMutation();

  const [postLikedState, setPostLiked] = useState(
    data.LikedByAuthor.length > 0
  );
  const [likesCountState, setLikesCountState] = useState(
    data._count.LikedByAuthor
  );
  const [bookmarkedState, setBookmarkedState] = useState(
    data.BookmarkedByAuthor.length > 0
  );

  const handleLike = async () => {
    setPostLiked(!postLikedState);
    setLikesCountState(likesCountState + (postLikedState ? -1 : 1));
    await likeQuery.mutateAsync({
      addLike: !postLikedState,
      postId: data.id,
    });
  };

  const handleBookmark = async () => {
    setBookmarkedState(!bookmarkedState);
    await bookmarkQuery.mutateAsync({
      addBookmark: !bookmarkedState,
      postId: data.id,
    });
  };

  return (
    <div className='pt-4 pr-4'>
      <div className='flex select-none pt-1 font-ibmplex text-sm leading-none text-themePrimary-50/70'>
        <div className='flex flex-grow items-center justify-start'>
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

        <div className='flex flex-grow items-center justify-start'>
          <Link
            title='Comments'
            href={`${data.Author.username}/${data.id}`}
            className='group/icon flex w-fit cursor-pointer items-center justify-center hover:text-themePrimary-300'>
            <span className='rounded-full p-1 text-lg group-hover/icon:bg-themePrimary-300/10'>
              <BiCommentDetail className=''></BiCommentDetail>
            </span>
            &nbsp;
            {data._count.Comments}
          </Link>
        </div>

        <div className='flex flex-grow items-center justify-start'>
          <button
            onClick={async () => {
              const shareUrl =
                typeof window !== 'undefined'
                  ? `${window.location.origin}/${data.Author.username}/${data.id}`
                  : '/';

              const shareData = {
                text: 'Check out this post on plex!',
                title: 'Share this post',
                url: shareUrl,
              };

              await navigator.clipboard.writeText(shareUrl);
              setShowCopyShareLink(true);
              setTimeout(() => {
                setShowCopyShareLink(false);
              }, 3000);

              if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
              }
            }}
            title='Share'
            className='w-fit cursor-pointer  items-center justify-center rounded-full p-1 text-lg hover:bg-green-300/10  hover:text-green-400'>
            <BiShare className='text-lg'></BiShare>
          </button>
        </div>

        <div className='flex flex-grow items-center justify-start'>
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
  );
};

export default PostViewInteractions;
