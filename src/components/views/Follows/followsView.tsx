import type { FC } from 'react';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import { useRouter } from 'next/router';

const FollowsView: FC<{
  page: 'followers' | 'followings';
}> = ({ page }) => {
  const followsQuery = api.follows.ping.useQuery({
    data: null,
  });
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

  return <></>;
};

export default FollowsView;
