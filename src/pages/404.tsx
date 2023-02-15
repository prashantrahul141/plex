import type { FC } from 'react';

import { signOut } from 'next-auth/react';
const FourZeroFour: FC = () => {
  return (
    <>
      <button
        className='btn'
        onClick={async () => {
          await signOut();
        }}></button>
    </>
  );
};
export default FourZeroFour;
