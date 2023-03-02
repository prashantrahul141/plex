import LoadingComponent from '@components/common/loadingcomponent';
import NothingToSeeHere from '@components/common/nothingToSeeHere';
import CommentForm from '@components/forms/commentform';
import CommentView from '@components/views/commentView/commentView';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IReturnComment } from 'src/types';

const CommentList: FC<{
  postId: string;
  postAuthor: { id: string; username: string };
}> = ({ postId, postAuthor }) => {
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
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex'>
          <div className='h-8 w-8'>
            <LoadingComponent></LoadingComponent>
          </div>
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
        postAuthor={postAuthor}
        addCreatedComment={(createdComment: IReturnComment) => {
          setCommentsData((prevCommentsData) => [
            ...prevCommentsData,
            createdComment,
          ]);
        }}
        postId={postId}
        authorImage={commentsQuery.data.currenUserImage}></CommentForm>
      {commentsData.map((eachComment) => (
        <CommentView key={eachComment.id} data={eachComment}></CommentView>
      ))}
      {commentsData.length < 1 && (
        <NothingToSeeHere
          text={
            <span>No comments yet, be the first one!</span>
          }></NothingToSeeHere>
      )}
    </div>
  );
};

export default CommentList;
