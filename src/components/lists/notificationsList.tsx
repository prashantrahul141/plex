import { api } from '@utils/api';
import type { FC } from 'react';
import LoadingComponent from '@components/common/loadingcomponent';
import NotificationView from '@components/views/notificationView/notificationView';

const NotificationsList: FC = () => {
  const notifications = api.notification.get.useQuery();

  if (notifications.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
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
    </div>
  );
};

export default NotificationsList;
