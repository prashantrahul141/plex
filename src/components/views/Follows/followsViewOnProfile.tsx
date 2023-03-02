import type { FC } from 'react';
import { useEffect } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import { useRouter } from 'next/router';
import SmallProfileView from '../profileView/smallProfileView';
import NothingToSeeHere from '@components/common/nothingToSeeHere';

const FollowsViewOnProfile: FC<{
  page: 'followers' | 'followings';
  setLayoutTitleCallback: (target: string) => void;
}> = ({ page, setLayoutTitleCallback }) => {
  const followsQuery =
    page === 'followers'
      ? api.follows.getAuthorFollowers.useQuery()
      : api.follows.getAuthorFollowings.useQuery();

  const router = useRouter();

  useEffect(() => {
    setLayoutTitleCallback(page);
  }, [page, setLayoutTitleCallback]);

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

export default FollowsViewOnProfile;
