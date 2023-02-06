import type { FC } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

const NotificationView: FC<{ text: string; type: 'system' | 'user' }> = ({
  text,
  type,
}) => {
  return (
    <article className='flex w-full items-center justify-center gap-2'>
      <div className='text-2xl text-themePrimary-50/95'>
        {type === 'system' && <AiTwotoneSetting></AiTwotoneSetting>}
        {type === 'user' && <FaUserAlt className='text-xl'></FaUserAlt>}
      </div>
      <div className='flex-grow font-mukta leading-none tracking-wide text-themePrimary-50/95'>
        <p>{text}</p>
      </div>
    </article>
  );
};
export default NotificationView;
