import { signIn } from 'next-auth/react';
import type { FC } from 'react';

const SignInForm: FC = () => {
  return (
    <div className='flex w-full flex-col items-center rounded-sm border border-themePrimary-300/10 bg-gradient-to-tr from-themePrimary-50/0 to-themePrimary-50/[0.05] pb-10 pt-4 sm:w-fit sm:px-8'>
      <div className='mb-6'>
        <span className='font-sans font-thin tracking-wide text-themePrimary-50/70'>
          Sign in with
        </span>
      </div>
      <div className='mx-16 mt-4 w-full px-6 sm:px-0 '>
        <button
          className='btn'
          onClick={() => {
            void signIn('google');
          }}>
          Google
        </button>
      </div>
      <div className='mx-16 my-5 w-full px-6 sm:px-0 '>
        <button
          className='btn'
          onClick={() => {
            void signIn('discord');
          }}>
          Discord
        </button>
      </div>
      <div className='mx-16 w-full px-6 sm:px-0'>
        <button
          className='btn'
          onClick={() => {
            void signIn('github');
          }}>
          Github
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
