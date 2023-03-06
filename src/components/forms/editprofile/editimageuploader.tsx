import type { FC } from 'react';
import { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { MdDeleteForever } from 'react-icons/md';
import LoadingComponent from '@components/common/loadingcomponent';
import { api } from '@utils/api';
import { env } from 'src/env/client.mjs';
import type { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import ErrorMessage from '@components/common/errorMessage';

const EditImageUploader: FC<{
  callbackfun: () => void;
  uploadType: 'banner' | 'image';
}> = ({ callbackfun, uploadType }) => {
  const CLOUDINARY_CLOUDNAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
  const CLOUDINARY_API_KEY = env.NEXT_PUBLIC_CLOUDINARY_CLOUDAPIKEY;

  const signatureQuery = api.post.getSignature.useQuery({}, { enabled: false });
  const [avatarImageState, setAvatarImageState] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [avatarImageObjectUrlState, setAvatarImageObjectUrlState] = useState<
    string | null
  >(null);
  const [uploadingImageProgress, setuploadingImageProgress] = useState<
    number | null
  >(null);

  const updateQuery =
    uploadType === 'banner'
      ? api.user.editBannerPicture.useMutation()
      : api.user.editProfilePicture.useMutation();

  const uploadImageUrlToDB = async ({
    url,
    public_id,
    version_number,
    signature,
  }: {
    url: string;
    public_id: string;
    version_number: number;
    signature: string;
  }) => {
    await updateQuery.mutateAsync({
      url,
      public_id,
      version_number,
      signature,
    });
    callbackfun();
  };

  const handleUpload = async () => {
    setuploadingImageProgress(0);
    const signature = (await signatureQuery.refetch()).data;

    if (signature && avatarImageState !== null) {
      const formData = new FormData();
      formData.append('file', avatarImageState);
      formData.append('api_key', CLOUDINARY_API_KEY);
      formData.append('signature', signature.signature);
      formData.append('timestamp', signature.timestamp);

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
        await uploadImageUrlToDB({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          url: cloudinaryResponse.data.url,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          public_id: cloudinaryResponse.data.public_id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          version_number: cloudinaryResponse.data.version,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          signature: cloudinaryResponse.data.signature,
        });
      }
    }
  };

  return (
    <motion.fieldset
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, translateX: '-50%', translateY: '-50%' }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.2,
      }}
      className='absolute left-1/2 top-1/3 z-20 h-max w-96 -translate-x-1/2 rounded-md border border-themePrimary-50/20 bg-baseBackground-100'>
      {uploadingImageProgress !== null && (
        <div className='absolute top-0 left-0 z-50 h-full w-full max-w-md rounded backdrop-brightness-50'>
          <div className='absolute top-1/2 left-1/2 h-10 w-10 -translate-y-1/2 -translate-x-1/2 text-center'>
            <LoadingComponent></LoadingComponent>
            <p className='mt-1 w-fit rounded-md bg-black/20 py-1 px-2 font-ibmplex text-sm tracking-wider  text-themePrimary-50'>
              {parseInt((uploadingImageProgress * 100).toString())}%
            </p>
          </div>
        </div>
      )}

      <div className='flex border-b border-themePrimary-50/30'>
        <div className='px-4 py-2 text-center font-mukta text-base tracking-wide text-themePrimary-50/95'>
          {uploadType === 'banner'
            ? 'Update Banner Picture'
            : 'Update Profile Picture'}
        </div>
        <div className=' flex flex-grow items-center justify-end pr-4'>
          <AiFillCloseCircle
            title='close'
            className='h-5 w-5 cursor-pointer text-base text-red-400 hover:text-red-500'
            onClick={callbackfun}></AiFillCloseCircle>
        </div>
      </div>

      {!avatarImageObjectUrlState && (
        <div className='flex items-center justify-center py-8'>
          <label
            htmlFor='contained-button-file-avatar'
            className='cursor-pointer'>
            <input
              accept={'.png, .jpg, .jpeg'}
              className='hidden'
              id='contained-button-file-avatar'
              type='file'
              onChange={({ target: { files } }) => {
                if (files !== null && files[0] !== undefined) {
                  if (files[0].size / 1024 ** 2 < 4) {
                    setSizeError(false);
                    setAvatarImageState(files[0]);
                    const objectUrl = URL.createObjectURL(files[0]);
                    setAvatarImageObjectUrlState(objectUrl);
                  } else {
                    setSizeError(true);
                  }
                }
              }}
            />
            <div className='group/image flex h-56 w-56 flex-col items-center justify-center rounded-full border border-themePrimary-50/30 hover:border-themePrimary-50/50'>
              <BsImage
                size={18}
                className='mb-2 text-themePrimary-300/70 hover:text-themePrimary-300/95 group-hover/image:text-themePrimary-300'></BsImage>
              <span className='font-mukta tracking-wide text-themePrimary-50/80 group-hover/image:text-themePrimary-50/95'>
                Choose Image
              </span>
            </div>
          </label>
        </div>
      )}

      {sizeError && (
        <div className='my-2 w-full'>
          <div className='mx-auto w-fit'>
            <ErrorMessage message='File size cannot exceed 4mb.'></ErrorMessage>
          </div>
        </div>
      )}

      {avatarImageObjectUrlState && (
        <>
          <div className='relative my-4'>
            <div className='flex items-center justify-center'>
              <img
                className='z-30 max-h-60 border border-themePrimary-50/40'
                src={avatarImageObjectUrlState}
                alt='avatar'
              />
            </div>
            <button
              title='delete'
              className='group absolute top-2 right-2 z-40 h-max w-max rounded-md  bg-black/40 bg-red-400 p-[2px] hover:bg-red-600'
              onClick={() => setAvatarImageObjectUrlState(null)}>
              <MdDeleteForever className='text-2xl text-red-400 group-hover:text-themePrimary-50'></MdDeleteForever>
            </button>
          </div>
          <div className='mb-4 flex items-center justify-center px-8'>
            <button
              type='button'
              onClick={handleUpload}
              className='btn bg-themePrimary-400/90 text-themePrimary-50/95 hover:bg-themePrimary-400'>
              {uploadType === 'image' && 'Set new profile picture'}
              {uploadType === 'banner' && 'Set new banner picture'}
            </button>
          </div>
        </>
      )}
    </motion.fieldset>
  );
};

export default EditImageUploader;
