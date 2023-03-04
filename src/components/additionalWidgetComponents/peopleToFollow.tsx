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

  return (
    <div className='w-full py-5 pl-3'>
      <header className='mb-4 w-full pl-1'>
        <span className='font-mukta text-xl leading-none tracking-wide text-themePrimary-50'>
          Who to follow
        </span>
      </header>
      <div className='pl-2'>
        {users.status !== 'success' && (
          <div className='flex w-full items-center justify-center'>
            <div className='flex'>
              <div className='h-8 w-8'>
                <LoadingComponent></LoadingComponent>
              </div>
            </div>
          </div>
        )}
        {users.status === 'success' &&
          usersState.map((eachUser) => (
            <SmallProfileView
              key={eachUser.id}
              data={eachUser}
              showBio={false}></SmallProfileView>
          ))}
      </div>
    </div>
  );
};

export default PeopleToFollow;
