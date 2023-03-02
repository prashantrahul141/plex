import type { FC } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView/postView';
import NothingToSeeHere from '@components/common/nothingToSeeHere';
import { BsBookmarkHeart } from 'react-icons/bs';

const BookmarksList: FC<{ authorId: string }> = ({ authorId }) => {
  const bookmarkedPosts = api.post.getBookmarks.useQuery();
  if (bookmarkedPosts.status !== 'success') {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex'>
          <div className='h-8 w-8'>
            <LoadingComponent></LoadingComponent>
          </div>
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
      {bookmarkedPosts.data.length < 1 && (
        <NothingToSeeHere
          text={
            <span>
              You haven&apos;t bookmarked anything yet! You can bookmark a post
              to save it by clicking on the&nbsp;
              <BsBookmarkHeart className='inline'></BsBookmarkHeart> button.
            </span>
          }></NothingToSeeHere>
      )}
    </div>
  );
};

export default BookmarksList;
