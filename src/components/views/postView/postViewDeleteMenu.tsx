import { motion } from 'framer-motion';
import type { FC } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const PostViewDeleteMenu: FC<{
  setShowDeleteMenu: (value: boolean) => void;
  handleDelete: () => Promise<void>;
}> = ({ setShowDeleteMenu, handleDelete }) => {
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
        className='fixed top-0 left-0 z-10 h-screen w-screen backdrop-brightness-75'></motion.div>

      <motion.div
        key={2}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, translateX: '-50%' }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          duration: 0.3,
        }}
        className='absolute top-0 left-1/2 z-20 h-max w-60 rounded-md border border-themePrimary-300/50 bg-baseBackground-100 py-4 text-themePrimary-50/80'>
        <header className='flex h-fit w-full px-4'>
          <h2 className='flex-grow text-center font-mukta text-base tracking-wide text-themePrimary-50/95'></h2>

          <AiFillCloseCircle
            title='close'
            className='h-5 w-5 cursor-pointer text-base text-red-400 hover:text-red-500'
            onClick={() => setShowDeleteMenu(false)}></AiFillCloseCircle>
        </header>
        <main className='h-max w-full px-2'>
          <div className='mx-2 my-4 mb-8 text-center'>
            <span className='font-mukta font-thin leading-none text-themePrimary-50'>
              Are you sure you want to permanently delete this post?
            </span>
          </div>
          <div className='flex gap-2'>
            <button
              className='btn py-1'
              onClick={() => setShowDeleteMenu(false)}>
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className='btn border-none bg-red-500/90 py-1 text-themePrimary-50/95 hover:bg-red-500'>
              <span className='mx-auto flex items-center justify-center'>
                <MdDeleteForever></MdDeleteForever>Delete
              </span>
            </button>
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default PostViewDeleteMenu;
