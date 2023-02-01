import type { FC } from 'react';

const SignInForm: FC = () => {
  return (
    <div className='flex w-full flex-col items-center rounded-sm border  border-themePrimary-100/40 py-10 sm:w-fit sm:px-8'>
      <div className='mx-16 mb-5 w-full px-6 sm:px-0 '>
        <button className='btn'>Google</button>
      </div>
      <div className='mx-16 w-full px-6 sm:px-0 '>
        <button className='btn'>Discord</button>
      </div>
      <div className='mx-16 mt-5 w-full px-6 sm:px-0'>
        <button className='btn'>Github</button>
      </div>
    </div>
  );
};

export default SignInForm;
