import HeadComp from '@components/common/headcomponent';
import LoadingComponent from '@components/common/loadingcomponent';
import SignInForm from '@components/forms/signinform';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignInPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    void router.push('/');
  } else if (status === 'unauthenticated') {
    return (
      <>
        <div className='flex h-screen flex-col items-center justify-center'>
          <span className='mb-12 font-unbounded text-3xl tracking-wider text-themePrimary-50'>
            Welcome
          </span>
          <SignInForm></SignInForm>
          <div className='mt-8'>
            <button className='btn border-none font-mukta text-sm text-themePrimary-100/60 hover:border-none hover:bg-transparent hover:text-themePrimary-200 hover:underline'>
              cancel
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <HeadComp headTitle='loading...'></HeadComp>

      <div className='absolute left-1/2 top-1/2 h-6 w-6 translate-x-1/2'>
        <LoadingComponent></LoadingComponent>
      </div>
    </>
  );
};

export default SignInPage;
