import ErrorMessage from '@components/common/errorMessage';
import { api } from '@utils/api';
import Image from 'next/image';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { IPostComment } from 'src/types';

const CommentForm: FC<{ postId: string; authorImage: string }> = ({
  authorImage,
  postId,
}) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IPostComment>({ mode: 'all' });
  const createCommentQuery = api.comments.create.useMutation();
  const postComment = async (data: IPostComment) => {
    resetField('commentText');
    await createCommentQuery.mutateAsync({
      commentText: data.commentText,
      postId,
    });
  };

  return (
    <form
      className='w-full border-b border-b-themePrimary-100/30 px-1 py-6'
      onSubmit={handleSubmit(postComment)}>
      <div className='flex w-full items-center justify-center gap-2'>
        <Image
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
            maxLength: { value: 200, message: 'Too long for a comment.' },
          })}></textarea>

        <button
          type='submit'
          className='btn h-fit w-fit rounded-3xl bg-themePrimary-400/90 px-2 text-themePrimary-50/95 hover:bg-themePrimary-400'>
          Comment
        </button>
      </div>
      <div className='pl-14'>
        {errors.commentText && (
          <ErrorMessage message={errors.commentText.message}></ErrorMessage>
        )}
      </div>
    </form>
  );
};
export default CommentForm;
