import type { FC } from 'react';
import { RiZzzFill } from 'react-icons/ri';

const NothingToSeeHere: FC<{ text?: JSX.Element }> = ({
  text = <span>Nothing to see here...</span>,
}) => {
  return (
    <main className='mt-12 w-full'>
      <section className='mx-auto flex w-fit max-w-lg flex-col items-center justify-center gap-2 text-center'>
        <RiZzzFill size={50} className='text-themePrimary-50'></RiZzzFill>
        <span className='font-mukta text-lg text-themePrimary-50'>{text}</span>
      </section>
    </main>
  );
};

export default NothingToSeeHere;
