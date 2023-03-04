import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import type { IReturnComment } from 'src/types';
import ReactTimeAgo from 'react-time-ago';
import { MdVerified } from 'react-icons/md';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { api } from '@utils/api';
import CommentViewText from '@components/views/commentView/commentViewText';

const CommentView: FC<{ data: IReturnComment }> = ({ data }) => {
  const [commentLiked, setCommentLiked] = useState(
    data.CommentLikedByAuthor.length > 0
  );
  const [commentLikesCount, setCommentLikesCount] = useState(
    data._count.CommentLikedByAuthor
  );

  const likeQuery = api.comments.like.useMutation();

  const handleLike = async () => {
    setCommentLiked((prev) => !prev);
    setCommentLikesCount(commentLikesCount + (commentLiked ? -1 : 1));
    await likeQuery.mutateAsync({ addLike: !commentLiked, commentId: data.id });
  };

  return (
    <article className='flex w-full gap-3 border-y border-themePrimary-100/10 px-2 py-3'>
      <header className=''>
        <Link href={'/' + data.author.username}>
          <Image
            className='h-12 min-h-[3rem] w-12 min-w-[3rem] rounded-full object-cover'
            alt={data.author.name}
            src={data.author.image}
            width={40}
            height={40}></Image>
        </Link>
      </header>
      <div className='flex-grow'>
        <Link href={`/${data.author.username}`} className='flex items-center'>
          <h5 className='font-mukta text-themePrimary-50/95 hover:underline'>
            {data.author.name}
          </h5>
          &nbsp;
          {data.author.authorVerified && (
            <h6 className='group/verified relative  text-themePrimary-50'>
              <MdVerified></MdVerified>
              <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50 group-hover/verified:block'>
                This user is verified by the plex team.
              </span>
            </h6>
          )}
          &nbsp;
          <h6 className='hidden font-ibmplex text-xs tracking-tight text-themePrimary-100/70 hover:underline sm:block'>
            @{data.author.username}
          </h6>
          &nbsp;
          <span className='text-2xl leading-none text-themePrimary-50/70'>
            ·
          </span>
          &nbsp;
          <h6 className='cursor-default font-ibmplex text-xs tracking-tighter text-themePrimary-100/70'>
            <ReactTimeAgo
              date={data.createdOn}
              timeStyle={'twitter'}></ReactTimeAgo>
          </h6>
        </Link>
        <span className='mb-2 block select-text whitespace-pre-line font-mukta font-thin leading-none tracking-wide text-themePrimary-50/95'>
          <CommentViewText text={data.commentText}></CommentViewText>
        </span>

        <div className='mt-3 select-none text-themePrimary-50/80'>
          <button
            className='group/icon flex w-fit cursor-pointer items-center justify-center hover:text-red-500'
            onClick={handleLike}
            title='Like'>
            <span className='flex w-fit cursor-pointer items-center justify-center  rounded-full p-1 hover:bg-red-500/20  group-hover/icon:bg-red-500/20'>
              {commentLiked && (
                <AiTwotoneHeart className='text-lg text-red-500'></AiTwotoneHeart>
              )}
              {!commentLiked && (
                <AiOutlineHeart className='text-lg'></AiOutlineHeart>
              )}
            </span>
            &nbsp;
            <span>{commentLikesCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
export default CommentView;
