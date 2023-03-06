import type { FC } from 'react';
import { useState } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import Image from 'next/image';
import type { IEditFormInput } from 'src/types';
import EditImageUploader from './editimageuploader';
import { AnimatePresence, motion } from 'framer-motion';

const EditProfileBannerForm: FC<{
  watch: UseFormWatch<IEditFormInput>;
  currentBanner: string;
  register: UseFormRegister<IEditFormInput>;
}> = ({ currentBanner }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className='flex w-full items-center justify-center'>
      <div
        onClick={() => setShowUploadForm(true)}
        className='relative h-64 w-full cursor-pointer items-center justify-center'>
        <Image
          alt='Avatar'
          priority
          className='mx-auto h-max w-max object-contain hover:brightness-90'
          src={currentBanner}
          sizes='500'
          fill></Image>
      </div>

      <AnimatePresence>
        {showUploadForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: 'easeInOut',
                duration: 0.2,
              }}
              className='fixed top-0 left-0 z-10 h-screen w-screen backdrop-brightness-50'
              onClick={() => setShowUploadForm(false)}></motion.div>
            <EditImageUploader
              callbackfun={() => setShowUploadForm(false)}
              uploadType={'banner'}></EditImageUploader>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default EditProfileBannerForm;
