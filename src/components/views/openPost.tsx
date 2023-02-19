import PostView from '@components/views/postView';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import type { Session } from 'next-auth';
import CommentForm from '@components/forms/commentform';

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
    void router.push('/404');
    return <></>;
  }

  if (postData.data.posts === null) {
    void router.push('/404');
    return <></>;
  }

  return (
    <>
      <PostView
        currentUserID={session.user.id}
        data={{ post: postData.data.posts }}></PostView>
      <CommentForm></CommentForm>
    </>
  );
};

export default OpenPost;
