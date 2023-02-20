import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { TReturnPost } from 'src/types';

const PostList: FC<{ userId?: string; authorId: string }> = ({
  userId,
  authorId,
}) => {
  const [skipPosts, setSkipPosts] = useState(0);
  const [postsData, setPostsData] = useState<Array<TReturnPost>>([]);

  const postQuery = userId
    ? api.post.listFromUserId.useQuery({ userId: userId, skip: skipPosts })
    : api.post.list.useQuery({ skip: skipPosts });

  useEffect(() => {
    if (postQuery.data && postQuery.data.posts) {
      setPostsData((prevPosts) => [...prevPosts, ...postQuery.data.posts]);
    }
    return () => setPostsData([]);
  }, []);

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
      {postsData.map((eachPost, index) => {
        if (index === postQuery.data.posts.length - 1) {
          return (
            <div key={eachPost.id} className='border border-red-400'>
              <PostView
                key={eachPost.id}
                data={eachPost}
                currentUserID={authorId}></PostView>
            </div>
          );
        } else {
          return (
            <PostView
              key={eachPost.id}
              data={eachPost}
              currentUserID={authorId}></PostView>
          );
        }
      })}
    </div>
  );
};

export default PostList;
