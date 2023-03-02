import { api } from '@utils/api';
import type { FC } from 'react';
import LoadingComponent from '@components/common/loadingcomponent';
import NotificationView from '@components/views/notificationView/notificationView';
import NothingToSeeHere from '@components/common/nothingToSeeHere';

const NotificationsList: FC = () => {
  const notifications = api.notification.get.useQuery();

  if (notifications.status !== 'success') {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex'>
          <div className='h-8 w-8'>
            <LoadingComponent></LoadingComponent>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=''>
      {notifications.data.map((eachNotification) => {
        return (
          <NotificationView
            key={eachNotification.id}
            data={eachNotification}></NotificationView>
        );
      })}

      {notifications.data.length < 1 && (
        <NothingToSeeHere
          text={<span>You&apos;re all caught up!</span>}></NothingToSeeHere>
      )}
    </div>
  );
};

export default NotificationsList;
