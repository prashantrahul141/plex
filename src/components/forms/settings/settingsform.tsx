import { signOut } from 'next-auth/react';
import type { FC } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { api } from '@utils/api';
import LoadingComponent from '@components/common/loadingcomponent';
import SettingsAnnouncementNotification from './settingsAnnouncementNotification';

const SettingsForm: FC = () => {
  const settingsQuery = api.settings.getSettings.useQuery();

  if (settingsQuery.status !== 'success' || settingsQuery.data === undefined) {
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
    <main className='h-full w-full'>
      <Link
        href={'/profile/edit'}
        className='flex w-full items-center border-y border-y-themePrimary-100/40 py-2  pl-4 font-mukta text-lg tracking-wide text-themePrimary-50/95 hover:bg-themePrimary-50/5'>
        <span>
          Edit Profile <span className='text-themePrimary-50/40'>{'>'}</span>
        </span>
      </Link>

      <div className='flex w-full items-center border-y border-y-themePrimary-100/40 py-2  pl-4 font-mukta text-lg tracking-wide text-themePrimary-50/95 hover:bg-themePrimary-50/5'>
        <SettingsAnnouncementNotification
          defaultValue={
            settingsQuery.data.officialNews
          }></SettingsAnnouncementNotification>
      </div>

      <div className='mt-4 flex w-full items-center justify-center'>
        <button
          onClick={() => {
            void signOut();
          }}
          className='btn w-fit rounded-xl border-red-500 px-3 py-[.3rem] text-red-500 hover:border-red-500/95 hover:bg-red-500/95 hover:text-white'>
          <span className='flex items-center justify-center gap-2'>
            <FaSignOutAlt></FaSignOutAlt>Sign Out
          </span>
        </button>
      </div>
    </main>
  );
};

export default SettingsForm;
