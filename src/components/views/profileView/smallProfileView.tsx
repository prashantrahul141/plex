import type { FC } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import type { IReturnSmallUser } from 'src/types';
import Link from 'next/link';
import ProfileViewBio from './profileViewBio';
const SmallProfileView: FC<{
  data: IReturnSmallUser;
  showBio?: boolean;
}> = ({ data, showBio = true }) => {
  return (
    <article className='rounded-lg hover:bg-themePrimary-200/5'>
      <Link className='flex py-2 px-3' href={'/' + data.username}>
        <div className=''>
          <Image
            className='h-12 min-h-[3rem] w-12 min-w-[3rem] rounded-full object-cover'
            width={50}
            height={50}
            alt={data.username}
            src={data.image}></Image>
        </div>
        <main className='relative flex-grow pt-1 pl-3'>
          <header className=''>
            <span className='flex gap-1 font-mukta text-xl leading-none tracking-wider text-themePrimary-50'>
              {data.name}
              {data.authorVerified && (
                <span className='group/verified relative'>
                  <MdVerified></MdVerified>
                  <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md border border-none bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50/90 group-hover/verified:block'>
                    This user is verified by the plex team.
                  </span>
                </span>
              )}
            </span>
            <span className='font-ibmplex text-sm leading-none tracking-wide text-themePrimary-50/60'>
              @{data.username}
            </span>
          </header>

          {showBio && (
            <div className='mt-3'>
              <p className='font-mukta font-thin leading-tight tracking-wide text-themePrimary-50/95'>
                <ProfileViewBio
                  preserveWhitespace={false}
                  bioText={data.bio}></ProfileViewBio>
              </p>
            </div>
          )}
        </main>
      </Link>
    </article>
  );
};

export default SmallProfileView;
