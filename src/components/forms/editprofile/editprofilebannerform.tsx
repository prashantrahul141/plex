import type { FC } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { IEditFormInput } from 'src/types';

const EditProfileBannerForm: FC<{
  watch: UseFormWatch<IEditFormInput>;
  currentBanner: string;
  register: UseFormRegister<IEditFormInput>;
}> = () => {
  return <></>;
};
export default EditProfileBannerForm;
