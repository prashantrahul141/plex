import LoadingComponent from '@components/common/loadingcomponent';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const PostViewDeleteMenu: FC<{
  setShowDeleteMenu: (value: boolean) => void;
  handleDelete: () => Promise<void>;
}> = ({ setShowDeleteMenu, handleDelete }) => {
  const [triggeredDelete, setTriggeredDelete] = useState(false);
  const handleDeleteButton = async () => {
    setTriggeredDelete(true);
    await handleDelete();
  };
  const handleSetDeleteMenu = () => {
    if (!triggeredDelete) {
      setShowDeleteMenu(false);
    }
  };

  return (
    <>
      <motion.div
        key={1}
        onClick={() => setShowDeleteMenu(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,
        }}
        className='fixed top-0 left-0 z-10 h-screen w-screen backdrop-brightness-50'></motion.div>

      <motion.div
        key={2}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, translateX: '-50%' }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          duration: 0.3,
        }}
        className='absolute top-1/3 left-1/2 z-20 h-max w-60 rounded-md border border-themePrimary-300/50 bg-baseBackground-100 py-4 text-themePrimary-50/80'>
        <header className='flex h-fit w-full px-4'>
          <h2 className='flex-grow text-center font-mukta text-base tracking-wide text-themePrimary-50/95'></h2>

          <AiFillCloseCircle
            title='close'
            className='h-5 w-5 cursor-pointer text-base text-red-400 hover:text-red-500'
            onClick={handleSetDeleteMenu}></AiFillCloseCircle>
        </header>
        <main className='h-max w-full px-2'>
          <div className='mx-2 my-4 mb-8 text-center'>
            <span className='font-mukta leading-tight text-themePrimary-50/90'>
              Are you sure you want to permanently delete this post?
            </span>
          </div>
          <div className='flex gap-2'>
            <button
              disabled={triggeredDelete}
              className='btn py-1 disabled:cursor-not-allowed disabled:bg-black/10 disabled:hover:bg-black/10'
              onClick={handleSetDeleteMenu}>
              Cancel
            </button>
            <button
              onClick={handleDeleteButton}
              disabled={triggeredDelete}
              className={`btn border-none bg-red-500/90 py-1 text-themePrimary-50/95 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-500/70 disabled:hover:bg-none`}>
              {!triggeredDelete && (
                <span className='mx-auto flex items-center justify-center'>
                  <MdDeleteForever></MdDeleteForever>Delete
                </span>
              )}
              {triggeredDelete && (
                <div className='flex items-center justify-center'>
                  <div className='h-6 w-6'>
                    <LoadingComponent
                      spinnerColor='border-t-red-100'
                      bgColor='border-red-200/10'></LoadingComponent>
                  </div>
                </div>
              )}
            </button>
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default PostViewDeleteMenu;
