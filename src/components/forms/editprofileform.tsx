import type { FC } from 'react';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import LoadingComponent from '@components/common/loadingcomponent';

const EditProfileForm: FC = () => {
  const UserData = api.user.getForEdit.useQuery();
  const router = useRouter();

  if (UserData.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
        </div>
      </div>
    );
  }

  if (UserData.data !== undefined && UserData.data.UserData === null) {
    void router.push('/404');
    return <></>;
  }

  return <></>;
};

export default EditProfileForm;
