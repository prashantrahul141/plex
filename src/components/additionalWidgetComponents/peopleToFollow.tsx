import LoadingComponent from '@components/common/loadingcomponent';
import SmallProfileView from '@components/views/profileView/smallProfileView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IReturnSmallUser } from 'src/types';

const PeopleToFollow: FC = () => {
  const [usersState, setUsersState] = useState<Array<IReturnSmallUser>>([]);
  const users = api.additionalWidgets.peopleToFollow.useQuery();

  useEffect(() => {
    if (users.data) {
      setUsersState(users.data);
    }
  }, [users.data]);

  if (users.status === 'loading') {
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
    <div className='w-full py-5 pl-3'>
      <header className='mb-4 w-full pl-1'>
        <span className='font-mukta text-2xl leading-none tracking-wide text-themePrimary-50'>
          Who to follow
        </span>
      </header>
      <div className='pl-2'>
        {usersState.map((eachUser) => (
          <SmallProfileView
            key={eachUser.id}
            data={eachUser}></SmallProfileView>
        ))}
      </div>
    </div>
  );
};

export default PeopleToFollow;
