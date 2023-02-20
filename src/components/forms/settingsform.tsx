import { signOut } from 'next-auth/react';
import type { FC } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const SettingsForm: FC = () => {
  return (
    <main className='h-full w-full'>
      <section className='flex w-full items-center border-y border-y-themePrimary-100/40  py-2 pl-4 font-mukta text-lg tracking-wide text-themePrimary-50/95'>
        <Link href={'/profile/edit'}>
          Edit Profile <span className='text-themePrimary-50/40'>{'>'}</span>
        </Link>
      </section>

      <div className='mt-4 flex w-full items-center justify-center'>
        <button
          onClick={() => {
            void signOut();
          }}
          className='btn w-fit rounded-xl border-red-500 px-3 py-[.3rem] text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white'>
          <span className='flex items-center justify-center gap-2'>
            <FaSignOutAlt></FaSignOutAlt>Sign Out
          </span>
        </button>
      </div>
    </main>
  );
};

export default SettingsForm;
