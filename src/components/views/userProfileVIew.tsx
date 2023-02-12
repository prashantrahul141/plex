import type { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@utils/api';
import ProfileView from './profileView';
import type { IReturnUser } from 'src/constants';
import LoadingComponent from '@components/common/loadingcomponent';

const UserProfileView: FC = () => {
  const [currentUser, setCurrentUser] = useState<IReturnUser>();
  const router = useRouter();

  const { username } = router.query;
  let getUsername = '#';
  if (Array.isArray(username) && username[0] !== undefined) {
    getUsername = username[0];
  } else if (typeof username === 'undefined') {
    getUsername = '#';
  }
  const getUserQuery = api.user.get.useQuery(
    { username: getUsername },
    { enabled: false }
  );

  if (typeof window !== 'undefined') {
    getUserQuery
      .refetch()
      .then((queryResult) => {
        if (queryResult.data && queryResult.data.foundUser !== null) {
          setCurrentUser(queryResult.data);
        } else {
          void router.push('/404');
        }
      })
      .catch(() => {
        void router.push('/404');
      });
  }

  if (currentUser !== undefined && currentUser.foundUser !== null) {
    return (
      <>
        <ProfileView data={currentUser}></ProfileView>
      </>
    );
  } else {
    void router.push('/404');
  }

  return (
    <>
      <LoadingComponent></LoadingComponent>
    </>
  );
};

export default UserProfileView;
