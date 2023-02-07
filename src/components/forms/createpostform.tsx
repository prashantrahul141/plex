import type { FC } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

interface IFormInput {
  postText: string;
  postImages?: File;
}

const CreatePostForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [postImageState, setPostImageState] = useState<File | null>(null);
  const [postImageObjectUrlState, setPostImageObjectUrlState] = useState<
    string | null
  >(null);

  const submitForm: SubmitHandler<IFormInput> = (data) => {
    console.log(data.postText, postImageState);
  };

  return (
    <form
      className='w-full max-w-md rounded-lg border border-themePrimary-100/10 bg-baseBackground-100/95 px-2 py-4'
      onSubmit={handleSubmit(submitForm)}>
      <div className='py-4 text-center'>
        <span className='font-mukta text-2xl leading-tight tracking-wide text-themePrimary-100/95'>
          Create a post
        </span>
      </div>
      <textarea
        placeholder='Your thoughts here'
        className='textarea mb-1'
        {...register('postText', {
          required: true,
          maxLength: 150,
        })}></textarea>

      {errors.postText?.type === 'required' && (
        <div>
          <span
            role='alert'
            className='ml-1 rounded-md bg-red-300 px-1 font-mukta text-xs text-red-700'>
            Forgot to type something here?
          </span>
        </div>
      )}

      {errors.postText?.type === 'maxLength' && (
        <div>
          <span
            role='alert'
            className='ml-1 rounded-md bg-red-300 px-1 font-mukta text-xs text-red-700'>
            A post cannot be longer than 150 characters :/
          </span>
        </div>
      )}

      <AnimatePresence>
        {postImageObjectUrlState !== null && (
          <motion.div
            className='relative my-8'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.3,
            }}>
            <img alt='Image' src={postImageObjectUrlState}></img>
            <button
              type='button'
              className='group absolute top-2 right-2 rounded-md bg-black/40 p-[2px] hover:bg-red-600/80'
              onClick={() => {
                setPostImageObjectUrlState(null);
                setPostImageState(null);
                const containedButtonFile = document.getElementById(
                  'contained-button-file'
                ) as HTMLInputElement;
                if (containedButtonFile !== null) {
                  containedButtonFile.value = '';
                }
              }}>
              <MdDeleteForever
                className='text-red-400 group-hover:text-themePrimary-50/80'
                size={24}></MdDeleteForever>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {postImageObjectUrlState === null && (
          <motion.div
            className='my-4 ml-1 w-min'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.3,
            }}>
            <label htmlFor='contained-button-file' className='cursor-pointer'>
              <input
                accept={'.png, .jpg, .jpeg'}
                className='hidden'
                id='contained-button-file'
                type='file'
                onChange={({ target: { files } }) => {
                  if (files !== null && files[0] !== undefined) {
                    setPostImageState(files[0]);
                    const objectUrl = URL.createObjectURL(files[0]);
                    setPostImageObjectUrlState(objectUrl);
                  }
                }}
              />
              <BsImage
                size={18}
                className='text-themePrimary-300/70 hover:text-themePrimary-300/95'></BsImage>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
      <button className='btn' type='submit'>
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
