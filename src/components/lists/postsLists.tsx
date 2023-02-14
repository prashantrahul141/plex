import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView';
import { api } from '@utils/api';
import type { FC } from 'react';

const PostList: FC<{ userId?: string; authorId: string }> = ({
  userId,
  authorId,
}) => {
  const postQuery = userId
    ? api.post.listFromUserId.useQuery({ userId: userId })
    : api.post.list.useQuery({});

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
      {postQuery.data.posts.map((eachPost) => {
        return (
          <PostView
            key={eachPost.id}
            data={{ post: eachPost }}
            currentUserID={authorId}></PostView>
        );
      })}
    </div>
  );
};

export default PostList;
