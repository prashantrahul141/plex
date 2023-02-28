import type { FC } from 'react';
import type { Notification } from '@prisma/client';
import ReactTimeAgo from 'react-time-ago';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@utils/api';

const NotificationView: FC<{ data: Notification }> = ({ data }) => {
  const markSeenMutation = api.notification.markSeen.useMutation();
  const markSeen = async () => {
    await markSeenMutation.mutateAsync({ notificationId: data.id });
  };

  return (
    <Link
      href={data.url}
      onClick={markSeen}
      className={`border-y-1 flex w-full items-center justify-center gap-2 border-b border-themePrimary-50/10 px-1 py-2 hover:bg-themePrimary-50/5 ${
        !data.seen ? 'bg-themePrimary-50/5' : ''
      }`}>
      <div className='h-10 w-10 text-2xl text-themePrimary-50/95'>
        <Image
          alt='Icon'
          src={data.iconImage}
          className='min-h-[2.4rem] min-w-[2.4rem] rounded-full object-cover'
          width={100}
          height={100}></Image>
      </div>

      <div className='flex-grow font-mukta leading-none tracking-wide text-themePrimary-50/95'>
        <p>{data.text}</p>
      </div>

      <div>
        <ReactTimeAgo
          className='font-ibmplex text-xs text-themePrimary-50/70'
          date={data.createdOn}
          timeStyle={'twitter'}></ReactTimeAgo>
      </div>
    </Link>
  );
};
export default NotificationView;
