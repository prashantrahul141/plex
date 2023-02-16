import type { FC } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';

const EditProfileImageForm: FC<{
  watch: UseFormWatch<IEditFormInput>;
  currentAvatar: string;
  register: UseFormRegister<IEditFormInput>;
}> = () => {
  return (
    <div className='relative'>
      <input type='file' name='' id='' />
    </div>
  );
};
export default EditProfileImageForm;
