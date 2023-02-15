import type { FC } from 'react';
import { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';
import { BiErrorCircle, BiCheckCircle } from 'react-icons/bi';

const EditProfileUsernameForm: FC<{
  currentUsername: string;
  register: UseFormRegister<IEditFormInput>;
}> = ({ currentUsername, register }) => {
  const checkIfAlreadyExists = (value: string) => {
    return !['abc', 'sans', 'sds'].includes(value);
  };
  const [existsAlready, setExistsAlready] = useState(false);

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
          validate: checkIfAlreadyExists,
          minLength: {
            value: 3,
            message: 'username cannot be shorter than 3 letters',
          },
        })}
      />
      {existsAlready && (
        <BiErrorCircle className='absolute right-2 text-xl text-red-400'></BiErrorCircle>
      )}
      {!existsAlready && (
        <BiCheckCircle className='absolute right-2 text-xl text-green-400'></BiCheckCircle>
      )}
    </div>
  );
};

export default EditProfileUsernameForm;
