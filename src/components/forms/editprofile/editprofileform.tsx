import type { FC } from 'react';
import { api } from '@utils/api';
import { useRouter } from 'next/router';
import LoadingComponent from '@components/common/loadingcomponent';
import { useForm } from 'react-hook-form';
import EditProfileUsernameForm from '@components/forms/editprofile/editprofileusernameform';
import type { IEditFormInput } from 'src/types';
import ErrorMessage from '@components/common/errorMessage';
import EditProfileURL from '@components/forms/editprofile/editprofileurl';
import EditProfileImageForm from '@components/forms/editprofile/editprofileimage';
import EditProfileBannerForm from '@components/forms/editprofile/editprofilebannerform';

const EditProfileForm: FC = () => {
  const UserDataQuery = api.user.getForEdit.useQuery();
  const EditUserDataQuery = api.user.editUserInfo.useMutation();

  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditFormInput>({ mode: 'all' });

  if (UserDataQuery.status !== 'success') {
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

  if (UserDataQuery.data === undefined || UserDataQuery.data === undefined) {
    void router.push('/404');
    return <></>;
  }

  const submitForm = async (data: IEditFormInput) => {
    await EditUserDataQuery.mutateAsync(data);
    void router.push('/profile');
  };

  return (
    <form className='w-full p-8'>
      <fieldset className='mb-1'>
        <div className='flex items-center justify-center'>
          <EditProfileImageForm
            watch={watch}
            register={register}
            currentAvatar={UserDataQuery.data.image}></EditProfileImageForm>
        </div>

        <div className='max-h-54 my-4 w-full min-w-full select-none items-center justify-center rounded-md bg-baseBackground-200/50 object-contain'>
          <EditProfileBannerForm
            watch={watch}
            register={register}
            currentBanner={UserDataQuery.data.banner}></EditProfileBannerForm>
        </div>
      </fieldset>

      <fieldset className='mb-4'>
        <input
          type='text'
          title='name'
          className='input mb-1'
          placeholder='Your name here'
          defaultValue={UserDataQuery.data.name}
          {...register('name', {
            required: { value: true, message: 'Forgot to type your name?' },
            minLength: {
              value: 2,
              message: 'Name cannot be shorter than 2 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Names cannot be longer than 20 characters.',
            },
          })}
        />

        {errors.name && (
          <ErrorMessage message={errors.name.message}></ErrorMessage>
        )}
      </fieldset>

      <fieldset className='mb-4'>
        <EditProfileUsernameForm
          watch={watch}
          currentUsername={UserDataQuery.data.username}
          register={register}></EditProfileUsernameForm>

        {errors.username && errors.username.type !== 'validate' && (
          <ErrorMessage message={errors.username.message}></ErrorMessage>
        )}
      </fieldset>

      <fieldset className='mb-4'>
        <EditProfileURL
          currentUrl={UserDataQuery.data.url}
          register={register}></EditProfileURL>
        {errors.url && errors.url.type !== 'validate' && (
          <ErrorMessage message={errors.url.message}></ErrorMessage>
        )}
        {errors.url && errors.url.type === 'validate' && (
          <ErrorMessage message='Not a valid url.'></ErrorMessage>
        )}
      </fieldset>

      <fieldset className='mb-4'>
        <textarea
          title='bio'
          className='textarea mb-1 h-32 whitespace-pre-line'
          placeholder='About you'
          defaultValue={UserDataQuery.data.bio || ''}
          {...register('bio', {
            maxLength: {
              value: 200,
              message: 'People prefer short bio over longer ones!',
            },
          })}
        />
        {errors.bio && (
          <ErrorMessage message={errors.bio.message}></ErrorMessage>
        )}
      </fieldset>

      <fieldset className='flex justify-end gap-2'>
        <button
          className='btn max-w-[10rem]'
          type='button'
          title='Cancel'
          onClick={() => void router.push('/profile')}>
          Cancel
        </button>

        <button
          onClick={handleSubmit(submitForm)}
          type='submit'
          className='btn max-w-[10rem] bg-themePrimary-400/90 text-themePrimary-50/95 hover:bg-themePrimary-400'
          title='Update Profile'>
          Update Profile
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfileForm;
