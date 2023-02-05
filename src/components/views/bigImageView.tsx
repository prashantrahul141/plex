import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BigImageView: FC<{
  imageUrl: string;
  callBackFun: (_state: boolean) => void;
}> = ({ imageUrl, callBackFun }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => callBackFun(false)}
        className='fixed top-0 left-0 h-screen w-screen backdrop-blur-sm backdrop-brightness-50'>
        <motion.div
          className='relative h-screen w-screen'
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          <Image
            className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
            src={imageUrl}
            width={1000}
            height={1000}
            alt='Image'></Image>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BigImageView;
