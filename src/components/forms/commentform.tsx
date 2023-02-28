import ErrorMessage from '@components/common/errorMessage';
import { api } from '@utils/api';
import Image from 'next/image';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { IPostComment, IReturnComment } from 'src/types';

const CommentForm: FC<{
  addCreatedComment: (createdCommenet: IReturnComment) => void;
  postId: string;
  authorImage: string;
  postAuthor: { id: string; username: string };
}> = ({ addCreatedComment, authorImage, postId, postAuthor }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IPostComment>({});
  const createCommentQuery = api.comments.create.useMutation();
  const postComment = async (data: IPostComment) => {
    resetField('commentText');
    const createdComment = await createCommentQuery.mutateAsync({
      postAuthor: postAuthor,
      commentText: data.commentText,
      postId,
    });
    addCreatedComment(createdComment);
  };

  return (
    <form
      className='w-full border-b border-b-themePrimary-100/20 py-3 px-2'
      onSubmit={handleSubmit(postComment)}>
      <div className='flex w-full items-center justify-center gap-2'>
        <Image
          priority={true}
          alt='Avatar'
          src={authorImage}
          width={50}
          height={50}
          className='h-12 min-h-[3rem] w-12 min-w-[3rem] rounded-full'></Image>

        <textarea
          title='Comment'
          className='textarea h-12 flex-grow'
          placeholder='Your comment'
          {...register('commentText', {
            required: {
              value: true,
              message: 'forgot to write something here?',
            },
            maxLength: { value: 200, message: 'Too long for a comment.' },
          })}></textarea>

        <button
          type='submit'
          className='btn h-fit w-fit rounded-3xl bg-themePrimary-400/90 px-2 text-themePrimary-50/95 hover:bg-themePrimary-400'>
          Comment
        </button>
      </div>
      <div className='pl-14 pt-2'>
        {errors.commentText && (
          <ErrorMessage message={errors.commentText.message}></ErrorMessage>
        )}
      </div>
    </form>
  );
};
export default CommentForm;
