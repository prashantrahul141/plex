import HeadComp from '@components/common/headcomponent';
import LoadingComponent from '@components/common/loadingcomponent';
import SignInForm from '@components/forms/signinform';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignInPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    void router.push('/');
  } else if (status === 'unauthenticated') {
    return (
      <>
        <HeadComp headTitle='Sign in'></HeadComp>
        <div className='flex h-screen flex-col items-center justify-center'>
          <Link
            href={'/'}
            className='mb-12 font-unbounded text-3xl tracking-wider text-themePrimary-50'>
            Welcome
          </Link>
          <SignInForm></SignInForm>
          <div className='mt-8'>
            <button
              onClick={() => {
                void router.push('/');
              }}
              className='btn border-none font-mukta text-sm tracking-wider text-themePrimary-100/60 hover:border-none hover:bg-none hover:text-themePrimary-100 hover:underline hover:shadow-none'>
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
