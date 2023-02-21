import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BigImageView: FC<{
  imageUrl: string;
  callBackFun: (_state: boolean) => void;
  width?: number;
}> = ({ imageUrl, callBackFun, width }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => callBackFun(false)}
        className='fixed top-0 left-0 z-40 h-screen w-screen backdrop-blur-sm backdrop-brightness-50'>
        <motion.div
          className='relative h-screen w-screen'
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}>
          {width === undefined && (
            <div className='relative z-50 h-screen w-screen'>
              <div className='absolute top-1/2 left-1/2 h-[95%] w-[95%] -translate-y-1/2 -translate-x-1/2 sm:w-[80%] '>
                <Image
                  priority={true}
                  className='absolute top-1/2 left-1/2 object-contain'
                  src={imageUrl}
                  fill
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                  alt='Image'></Image>
              </div>
            </div>
          )}

          {width !== undefined && (
            <Image
              className='absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2'
              priority={true}
              src={imageUrl}
              width={width}
              height={width}
              alt='Image'></Image>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default BigImageView;
