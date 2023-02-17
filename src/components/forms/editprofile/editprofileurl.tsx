import type { FC } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';

const EditProfileURL: FC<{
  register: UseFormRegister<IEditFormInput>;
  currentUrl: string | null;
}> = ({ register, currentUrl }) => {
  const validateURL = (url: string | null) => {
    if (url === '' || url === null) {
      return true;
    }
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <input
      className='input mb-1'
      type='url'
      placeholder='https://yourwebsite.com'
      defaultValue={currentUrl || ''}
      {...register('url', { validate: validateURL })}></input>
  );
};

export default EditProfileURL;
