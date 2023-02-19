import LoadingComponent from '@components/common/loadingcomponent';
import CommentForm from '@components/forms/commentform';
import CommentView from '@components/views/commentView';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import type { FC } from 'react';

const CommentList: FC<{ postId: string }> = ({ postId }) => {
  const router = useRouter();
  const commentsQuery = api.comments.getComments.useQuery({ postId });

  if (commentsQuery.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
        </div>
      </div>
    );
  }

  if (commentsQuery.data === null) {
    void router.push('/404');
    return <></>;
  }

  return (
    <div className=''>
      <CommentForm
        postId={postId}
        authorImage={commentsQuery.data.currenUserImage}></CommentForm>
      {commentsQuery.data.comments.map((eachComment) => (
        <CommentView key={eachComment.id} data={eachComment}></CommentView>
      ))}
    </div>
  );
};

export default CommentList;
