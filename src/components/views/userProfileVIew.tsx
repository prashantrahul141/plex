import type { FC } from 'react';
import { useEffect } from 'react';
import { api } from '@utils/api';
import ProfileView from './profileView/profileView';
import LoadingComponent from '@components/common/loadingcomponent';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import HeadComp from '@components/common/headcomponent';
import PostList from '@components/lists/postsList';
import React from 'react';

const UserProfileView: FC<{
  isCurrentUser: boolean;
  session: Session;
  setLayoutTitleCallback: (target: string) => void;
}> = ({ isCurrentUser, session, setLayoutTitleCallback }) => {
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
    ? api.user.getForShowFromId.useQuery({ id: idToFind })
    : api.user.getForShow.useQuery({ username: idToFind });

  useEffect(() => {
    if (getUserQuery.data && getUserQuery.data.foundUser) {
      setLayoutTitleCallback(getUserQuery.data.foundUser.name);
    }
  }, [getUserQuery.data, setLayoutTitleCallback]);

  if (getUserQuery.status !== 'success') {
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
  if (getUserQuery.data.foundUser === null) {
    void router.push('/404');
    return <></>;
  }

  return (
    <>
      <HeadComp headTitle={getUserQuery.data.foundUser.name}></HeadComp>
      <ProfileView data={getUserQuery.data}></ProfileView>
      <PostList
        userId={getUserQuery.data.foundUser.id}
        authorId={session.user.id}></PostList>
    </>
  );
};

export default UserProfileView;
