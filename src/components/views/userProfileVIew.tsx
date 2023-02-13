import type { FC } from 'react';
import { api } from '@utils/api';
import ProfileView from './profileView';
import LoadingComponent from '@components/common/loadingcomponent';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';

const UserProfileView: FC<{
  isCurrentUser: boolean;
  session: Session;
}> = ({ isCurrentUser, session }) => {
  const router = useRouter();

  // sets idToFind to username or id of current user.
  let idToFind = '#';
  if (isCurrentUser) {
    // if author's profile
    idToFind = session.user.id;
  } else {
    // if viewing other's profile
    const { username } = router.query;
    if (typeof username === 'string') {
      idToFind = username;
    } else if (Array.isArray(username) && username[0] !== undefined) {
      idToFind = username[0];
    } else if (typeof username === 'undefined') {
      idToFind = '#';
    }
  }

  const getUserQuery = isCurrentUser
    ? api.user.getFromId.useQuery({ id: idToFind })
    : api.user.get.useQuery({ username: idToFind });

  if (getUserQuery.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
        </div>
      </div>
    );
  }
  if (getUserQuery.data.foundUser === null) {
    void router.push('/404');
    return <></>;
  }

  return (
    <>
      <ProfileView data={getUserQuery.data}></ProfileView>
    </>
  );
};

export default UserProfileView;
