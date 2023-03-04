import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';
import { BiErrorCircle, BiCheckCircle } from 'react-icons/bi';
import { api } from '@utils/api';
import {
  illegalUsernames,
  PROFILE_FORM_USERNAME_REGEX,
} from 'src/constantValues';
import LoadingComponent from '@components/common/loadingcomponent';

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

    if (illegalUsernames.includes(usernameState)) {
      setExistsAlready(true);
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
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameState]);

  return (
    <div className='relative mb-1 flex items-center'>
      <input
        type='text'
        title='username'
        className='input'
        placeholder='Your username here'
        defaultValue={currentUsername}
        {...register('username', {
          required: { value: true, message: 'Forgot to type your username?' },
          minLength: {
            value: 3,
            message: 'username cannot be shorter than 3 characters.',
          },
          maxLength: {
            value: 16,
            message: 'username cannot be longer than 16 characters',
          },
          pattern: {
            value: PROFILE_FORM_USERNAME_REGEX,
            message:
              "Username can only contain letters, numbers and '_'. And should only start with letters.",
          },
          validate: () => {
            return !existsAlready;
          },
        })}
      />
      {loadingUsernameCheck && (
        <div className='absolute right-2 h-5 w-5'>
          <LoadingComponent></LoadingComponent>
        </div>
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
