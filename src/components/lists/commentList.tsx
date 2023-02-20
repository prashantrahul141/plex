import LoadingComponent from '@components/common/loadingcomponent';
import CommentForm from '@components/forms/commentform';
import CommentView from '@components/views/commentView';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IReturnComment } from 'src/types';

const CommentList: FC<{ postId: string }> = ({ postId }) => {
  const router = useRouter();
  const commentsQuery = api.comments.getComments.useQuery({ postId });
  const [commentsData, setCommentsData] = useState<Array<IReturnComment>>([]);

  useEffect(() => {
    if (commentsQuery.data) {
      setCommentsData(commentsQuery.data.comments);
    }
  }, [commentsQuery.data]);

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
    <div>
      <CommentForm
        refetchCallback={async () => {
          await commentsQuery.refetch();
        }}
        postId={postId}
        authorImage={commentsQuery.data.currenUserImage}></CommentForm>
      {commentsData.map((eachComment) => (
        <CommentView key={eachComment.id} data={eachComment}></CommentView>
      ))}
    </div>
  );
};

export default CommentList;
