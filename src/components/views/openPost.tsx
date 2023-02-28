import PostView from '@components/views/postView/postView';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import type { Session } from 'next-auth';
import LoadingComponent from '@components/common/loadingcomponent';
import CommentList from '@components/lists/commentList';

const OpenPost: FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const { postId } = router.query;

  let postIdToFind = '#';

  if (typeof postId === 'string') {
    postIdToFind = postId;
  } else if (Array.isArray(postId) && postId[0] !== undefined) {
    postIdToFind = postId[0];
  } else if (typeof postId === 'undefined') {
    postIdToFind = '#';
  }

  const postData = api.post.view.useQuery({ postId: postIdToFind });

  if (postData.status !== 'success') {
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

  if (postData.data.posts === null) {
    void router.push('/404');
    return <></>;
  }

  return (
    <>
      <PostView
        imagePrioriy={true}
        currentUserID={session.user.id}
        data={postData.data.posts}></PostView>
      <CommentList
        postId={postData.data.posts.id}
        postAuthor={{
          id: postData.data.posts.Author.id,
          username: postData.data.posts.Author.username,
        }}></CommentList>
    </>
  );
};

export default OpenPost;
