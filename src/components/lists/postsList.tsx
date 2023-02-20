import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { TReturnPost } from 'src/types';
import POSTS_PER_PAGE from 'src/constantValues';

const PostList: FC<{ userId?: string; authorId: string }> = ({
  userId,
  authorId,
}) => {
  const [skipPosts, setSkipPosts] = useState(POSTS_PER_PAGE);
  const [postsData, setPostsData] = useState<Array<TReturnPost>>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const postQuery = userId
    ? api.post.listFromUserId.useQuery({ userId: userId })
    : api.post.list.useQuery({});

  const loadMorePostsQuery = userId
    ? api.post.listFromUserId.useQuery({ userId: userId, skip: skipPosts })
    : api.post.list.useQuery({ skip: skipPosts });

  // initial data load
  useEffect(() => {
    if (postQuery.data && postQuery.data.posts) {
      setPostsData((prevPostsData) => [
        ...prevPostsData,
        ...postQuery.data.posts,
      ]);
    }
  }, [postQuery.data]);

  const loadMorePosts = async () => {
    setLoadingPosts(true);
    setSkipPosts((prevSkipPosts) => prevSkipPosts + POSTS_PER_PAGE);
    await loadMorePostsQuery.refetch();
    const newPostsData = loadMorePostsQuery.data?.posts;
    if (newPostsData) {
      setPostsData((prevPostsData) => {
        return [...prevPostsData, ...newPostsData];
      });
    }
    setLoadingPosts(false);
  };

  if (postQuery.status !== 'success') {
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
      {postsData.map((eachPost) => {
        return (
          <PostView
            key={eachPost.id}
            data={eachPost}
            currentUserID={authorId}></PostView>
        );
      })}
      {!loadingPosts && (
        <button className='btn' type='button' onClick={loadMorePosts}>
          load more
        </button>
      )}
    </div>
  );
};

export default PostList;
