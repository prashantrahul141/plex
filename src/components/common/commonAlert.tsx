import type { FC } from 'react';
import { motion } from 'framer-motion';

const CommonAlert: FC<{
  alertText: string;
  alertType: 'error' | 'warn' | 'success';
}> = ({ alertText, alertType }) => {
  return (
    <motion.div
      initial={{ bottom: -24, opacity: 0 }}
      animate={{ bottom: 24, opacity: 1 }}
      exit={{ bottom: -24, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-md px-2 py-1 ${
        alertType === 'success' ? 'bg-green-400' : ''
      } ${alertType === 'warn' ? 'bg-yellow-400' : ''} ${
        alertType === 'error' ? 'bg-red-400' : ''
      }`}>
      <span className='select-none font-mukta leading-snug text-black'>
        {alertText}
      </span>
    </motion.div>
  );
};

export default CommonAlert;
