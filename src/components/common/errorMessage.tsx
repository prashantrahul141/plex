import type { FC } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorMessage: FC<{ message: string | undefined }> = ({ message }) => {
  return (
    <div title={message}>
      <span
        role='alert'
        className='flex w-fit items-center gap-1 rounded-md border border-red-500/40 bg-red-100/90 px-1 font-mukta text-sm text-red-700'>
        <BiErrorCircle></BiErrorCircle>
        {message}
      </span>
    </div>
  );
};

export default ErrorMessage;
