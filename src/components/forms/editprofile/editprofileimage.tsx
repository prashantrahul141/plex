import type { FC } from 'react';
import { useState } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import Image from 'next/image';
import type { IEditFormInput } from 'src/types';
import EditImageUploader from './editimageuploader';
import { AnimatePresence, motion } from 'framer-motion';

const EditProfileImageForm: FC<{
  watch: UseFormWatch<IEditFormInput>;
  currentAvatar: string;
  register: UseFormRegister<IEditFormInput>;
}> = ({ currentAvatar }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <>
      <Image
        className='h-28 w-28 cursor-pointer rounded-full object-cover hover:brightness-90'
        alt='Avatar'
        priority
        onClick={() => setShowUploadForm(true)}
        src={currentAvatar}
        width={120}
        height={120}></Image>

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
              uploadType={'image'}></EditImageUploader>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default EditProfileImageForm;
