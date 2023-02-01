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
        <SignInForm></SignInForm>
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
