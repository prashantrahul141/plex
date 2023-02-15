import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';
import { BiErrorCircle, BiLoaderAlt, BiCheckCircle } from 'react-icons/bi';
import { api } from '@utils/api';

const EditProfileUsernameForm: FC<{
  watch: UseFormWatch<IEditFormInput>;
  currentUsername: string;
  register: UseFormRegister<IEditFormInput>;
}> = ({ currentUsername, register, watch }) => {
  const [existsAlready, setExistsAlready] = useState(false);
  const [loadingUsernameCheck, setLoadingUsernameCheck] = useState(false);
  const usernameState = watch('username', currentUsername);
  const usernameCheckQuery = api.user.checkUsername.useQuery(
    { username: usernameState },
    { enabled: false }
  );

  useEffect(() => {
    if (usernameState === currentUsername) {
      setExistsAlready(false);
      return;
    }
    setLoadingUsernameCheck(true);
    const fetchData = async () => {
      const result = await usernameCheckQuery.refetch();
      return result.data || false;
    };
    fetchData()
      .then((data) => {
        setExistsAlready(data);
        setLoadingUsernameCheck(false);
      })
      .catch((data) => {
        console.log(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameState]);

  return (
    <div className='relative flex items-center'>
      <input
        type='text'
        title='username'
        className='input mb-1'
        placeholder='Your username here'
        defaultValue={currentUsername}
        {...register('username', {
          required: { value: true, message: 'Forgot to type your username?' },
          minLength: {
            value: 3,
            message: 'username cannot be shorter than 3 letters',
          },
          validate: () => {
            return existsAlready;
          },
        })}
      />
      {loadingUsernameCheck && (
        <BiLoaderAlt className='absolute right-2 text-xl text-blue-400'></BiLoaderAlt>
      )}
      {existsAlready && !loadingUsernameCheck && (
        <BiErrorCircle className='absolute right-2 text-xl text-red-400'></BiErrorCircle>
      )}
      {!existsAlready && !loadingUsernameCheck && (
        <BiCheckCircle className='absolute right-2 text-xl text-green-400'></BiCheckCircle>
      )}
    </div>
  );
};

export default EditProfileUsernameForm;
