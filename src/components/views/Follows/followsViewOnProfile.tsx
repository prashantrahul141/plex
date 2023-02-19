import type { FC } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import { useRouter } from 'next/router';
import SmallProfileView from '../profileView/smallProfileView';

const FollowsViewOnProfile: FC<{
  page: 'followers' | 'followings';
}> = ({ page }) => {
  const followsQuery =
    page === 'followers'
      ? api.follows.getAuthorFollowers.useQuery()
      : api.follows.getAuthorFollowings.useQuery();

  const router = useRouter();

  if (followsQuery.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
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
    </>
  );
};

export default FollowsViewOnProfile;
