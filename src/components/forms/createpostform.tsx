import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface IFormInput {
  postText: string;
  postImages?: Array<string>;
}

const CreatePostForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const submitForm: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(submitForm)}>
      <input
        className='w-full'
        {...register('postText', { required: true, maxLength: 20 })}
      />
      {errors.postText?.type === 'required' && (
        <p role='alert'>forgot to type something here?</p>
      )}
      <input type='file'></input>
      <button className='btn' type='submit'>
        submit
      </button>
    </form>
  );
};

export default CreatePostForm;
