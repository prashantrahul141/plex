import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { PostComment } from 'src/types';

const CommentForm: FC<{ postId: string; authorImage: string }> = ({
  authorImage,
  postId,
}) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostComment>({ mode: 'all' });

  const postComment = () => {
    console.log();
  };

  return (
    <form className='w-full'>
      <input
        title='Comment'
        placeholder='Your comment'
        type='text'
        {...register('commentText', {
          maxLength: { value: 200, message: 'Too long for a comment.' },
        })}></input>
    </form>
  );
};
export default CommentForm;
