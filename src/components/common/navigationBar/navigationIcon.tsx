import Link from 'next/link';
import type { FC } from 'react';
import Image from 'next/image';

const NavigationIcon: FC = () => {
  return (
    <div className='mb-8 mt-2 flex select-none justify-center xl:justify-start'>
      <Link href={'/'} className='group flex items-center gap-1'>
        <Image
          className=''
          priority
          src='/favicon.ico'
          width={32}
          height={32}
          alt='Plex'></Image>
        <span className='hidden pt-1 font-mukta text-[1.6rem] leading-none tracking-wider text-themePrimary-50/20 xl:group-hover:block'>
          lex
        </span>
      </Link>
    </div>
  );
};

export default NavigationIcon;
