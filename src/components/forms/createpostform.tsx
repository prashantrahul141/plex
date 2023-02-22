import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { env } from 'src/env/client.mjs';
import { api } from '@utils/api';
import type { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import LoadingComponent from '@components/common/loadingcomponent';
import { useRouter } from 'next/router';
import ErrorMessage from '@components/common/errorMessage';
import type { IFormInput } from 'src/types';

const CreatePostForm: FC<{ formSetCallback: (value: boolean) => void }> = ({
  formSetCallback,
}) => {
  const CLOUDINARY_CLOUDNAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
  const CLOUDINARY_API_KEY = env.NEXT_PUBLIC_CLOUDINARY_CLOUDAPIKEY;

  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({ mode: 'all' });

  useEffect(() => {
    setFocus('postText');
  }, [setFocus]);

  const [postImageState, setPostImageState] = useState<File | null>(null);
  const [postImageObjectUrlState, setPostImageObjectUrlState] = useState<
    string | null
  >(null);
  const [uploadingImageProgress, setuploadingImageProgress] = useState<
    number | null
  >(null);
  const router = useRouter();

  // requests a cloudinary signature
  const signatureQuery = api.post.getSignature.useQuery({}, { enabled: false });
  const createPostMutation = api.post.create.useMutation();
  const makePost = async (formData: IFormInput) => {
    const mutatedPost = await createPostMutation.mutateAsync({
      postText: formData.postText,
      postImages: formData.postImages,
    });
    formSetCallback(false);
    void router.push(
      `/${mutatedPost.createdPost.Author.username}/${mutatedPost.createdPost.id}`
    );
  };

  const submitForm: SubmitHandler<IFormInput> = async (data) => {
    if (postImageState) {
      const result = (await signatureQuery.refetch()).data;
      if (result) {
        const formData = new FormData();
        formData.append('file', postImageState);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('signature', result.signature);
        formData.append('timestamp', result.timestamp);
        const cloudinaryResponse = await axios.post(
          `${env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT}/${CLOUDINARY_CLOUDNAME}/image/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (e: AxiosProgressEvent) => {
              if (typeof e.progress === 'number') {
                setuploadingImageProgress(e.progress);
              }
            },
          }
        );

        if (cloudinaryResponse.status === 200 && cloudinaryResponse.data) {
          await makePost({
            ...data,

            postImages: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              public_id: cloudinaryResponse.data.public_id,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              version_number: cloudinaryResponse.data.version,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              signature: cloudinaryResponse.data.signature,
            },
          });
        }
      }
    } else {
      // make post without uploading image.
      await makePost({ ...data, postImages: null });
    }
  };

  return (
    <form
      className='max-w-screen relative w-96 rounded-lg border border-themePrimary-100/10 bg-baseBackground-100 px-2 py-4'
      onSubmit={handleSubmit(submitForm)}>
      {uploadingImageProgress && (
        <>
          <div className='absolute top-0 left-0 z-30 h-full w-full max-w-md rounded backdrop-brightness-50'>
            <div className='absolute top-1/2 left-1/2 h-10 w-10 -translate-y-1/2 -translate-x-1/2 text-center'>
              <LoadingComponent></LoadingComponent>
              <p className='mt-1 w-fit rounded-md bg-black/20 px-2 py-1 font-ibmplex text-sm tracking-wider  text-themePrimary-50'>
                {parseInt((uploadingImageProgress * 100).toString())}%
              </p>
            </div>
          </div>
        </>
      )}

      <div className='py-4 text-center'>
        <span className='font-mukta text-2xl leading-tight tracking-wide text-themePrimary-100/95'>
          Create a post
        </span>
      </div>
      <textarea
        placeholder='Your thoughts here'
        className='textarea mb-1'
        {...register('postText', {
          required: { value: true, message: 'Forgot to type something here?' },
          maxLength: {
            value: 150,
            message: '   A post cannot be longer than 150 characters :/',
          },
        })}></textarea>

      {errors.postText && (
        <ErrorMessage message={errors.postText.message}></ErrorMessage>
      )}

      <AnimatePresence>
        {postImageObjectUrlState !== null && (
          <motion.div
            className='my-8 w-full '
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.3,
            }}>
            <div className='relative mx-auto w-36'>
              <img alt='Image' className='' src={postImageObjectUrlState}></img>
              <button
                type='button'
                className='group absolute top-2 right-2 rounded-md bg-black/40 p-[2px] hover:bg-red-600'
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
                  className='text-red-400 group-hover:text-themePrimary-50'
                  size={24}></MdDeleteForever>
              </button>
            </div>
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
