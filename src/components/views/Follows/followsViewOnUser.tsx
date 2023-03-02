import type { FC } from 'react';
import { useEffect } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import { useRouter } from 'next/router';
import SmallProfileView from '../profileView/smallProfileView';
import NothingToSeeHere from '@components/common/nothingToSeeHere';

const FollowsViewOnUser: FC<{
  page: 'followers' | 'followings';
  setLayoutTitleCallback: (target: string) => void;
}> = ({ page, setLayoutTitleCallback }) => {
  const router = useRouter();

  // sets idToFind to username
  let idToFind = '#';

  // if viewing other's profile
  const { username } = router.query;
  if (typeof username === 'string') {
    idToFind = username;
  } else if (Array.isArray(username) && username[0] !== undefined) {
    idToFind = username[0];
  } else if (typeof username === 'undefined') {
    idToFind = '#';
  }

  const followsQuery =
    page === 'followers'
      ? api.follows.getFollowersFromUsername.useQuery({ username: idToFind })
      : api.follows.getFollowingsFromUsername.useQuery({ username: idToFind });

  useEffect(() => {
    setLayoutTitleCallback(`${idToFind}'s ${page}`);
  }, [page, idToFind, setLayoutTitleCallback]);

  if (followsQuery.status !== 'success') {
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

  if (followsQuery.data === undefined) {
    void router.push('/404');
    return <></>;
  }

  return (
    <>
      {followsQuery.data.follows.map((eachFollow) => (
        <SmallProfileView
          data={eachFollow}
          key={eachFollow.username}></SmallProfileView>
      ))}
      {followsQuery.data.follows.length < 1 && (
        <NothingToSeeHere></NothingToSeeHere>
      )}
    </>
  );
};

export default FollowsViewOnUser;
