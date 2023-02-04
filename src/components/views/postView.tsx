import Image from 'next/image';
import type { FC } from 'react';

const PostView: FC<{
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  postedDate: string;
  postText: string;
  postImage: string | null;
  likesCount: number;
  commentsCount: number;
  authorAdmin: boolean;
}> = ({
  authorAvatar,
  authorName,
  authorUsername,
  postedDate,
  postText,
  postImage,
  likesCount,
  commentsCount,
  authorAdmin,
}) => {
  return (
    <main className='flex'>
      <div>
        <Image
          src={authorAvatar}
          alt={authorName}
          width={100}
          height={100}></Image>
      </div>
      <div>
        <header className='flex'>
          <h5>{authorName}</h5>&nbsp;
          <h6>{authorUsername}</h6>&nbsp;·&nbsp;
          <h6>{postedDate.toString()}</h6>
        </header>
        <header>{postText}</header>
        {postImage !== null && (
          <div>
            <Image
              width={1000}
              height={1000}
              src={postImage}
              alt={postText}></Image>
          </div>
        )}
        <div className='flex'>
          <span className=''>{likesCount}</span>
          <span className=''>{commentsCount}</span>
          <span className=''></span>
        </div>
      </div>
    </main>
  );
};

export default PostView;
