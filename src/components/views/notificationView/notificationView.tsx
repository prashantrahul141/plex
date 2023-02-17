import type { FC } from 'react';

const NotificationView: FC<{
  text: string;
  icon: string;
  url: string;
  createdOn: string;
  seen: boolean;
}> = ({ text, icon }) => {
  return (
    <article className='flex w-full items-center justify-center gap-2'>
      <div className='text-2xl text-themePrimary-50/95'></div>
      <div className='flex-grow font-mukta leading-none tracking-wide text-themePrimary-50/95'>
        <p>{text}</p>
      </div>
    </article>
  );
};
export default NotificationView;
