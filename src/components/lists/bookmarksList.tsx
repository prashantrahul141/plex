import type { FC } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView';

const BookmarksList: FC<{ authorId: string }> = ({ authorId }) => {
  const bookmarkedPosts = api.post.getBookmarks.useQuery();
  if (bookmarkedPosts.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      {bookmarkedPosts.data.map((eachPost) => {
        return (
          <PostView
            key={eachPost.post.id}
            data={eachPost.post}
            currentUserID={authorId}></PostView>
        );
      })}
    </div>
  );
};

export default BookmarksList;
