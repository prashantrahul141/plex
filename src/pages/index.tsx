import HeadComp from '@components/common/headcomponent';
import LoadingComponent from '@components/common/loadingcomponent';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    void router.push('/home');
  } else if (status === 'unauthenticated') {
    void router.push('/welcome');
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

export default Home;
