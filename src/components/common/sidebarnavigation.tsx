import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { getNavMenuTabs } from 'src/constants';

const SideBarNavigation: FC<{
  activateTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activateTab, authorAvatar, authorName }) => {
  return (
    <nav className='flex h-screen w-max flex-col'>
      <div className='mb-8 mt-4'>
        <Link href={'/'}>
          <Image src='/favicon.ico' width={32} height={32} alt='Plex'></Image>
        </Link>
      </div>
      {getNavMenuTabs().map((eachTab, index) => {
        return (
          <div key={index} className='my-3 flex'>
            <Link href={eachTab.link}>
              <i className='group relative flex items-center'>
                {activateTab === eachTab.name
                  ? eachTab.activateIcon
                  : eachTab.inactivateIcon}
                <span className='absolute left-full ml-1 hidden rounded-md bg-themePrimary-50/70 px-1  font-mukta text-sm not-italic leading-relaxed text-black group-hover:block'>
                  {eachTab.name}
                </span>
              </i>
            </Link>
          </div>
        );
      })}
      <div className='my-8 flex'>
        <Link href={'/profile'}>
          <i className='group relative flex items-center'>
            <Image
              className='w-8 rounded-full border-2'
              src={authorAvatar}
              width={50}
              height={50}
              alt={authorName}></Image>
            <span className='absolute left-full ml-1 hidden rounded-md bg-themePrimary-50/70 px-1 font-mukta text-sm not-italic leading-relaxed text-black group-hover:block'>
              {authorName}
            </span>
          </i>
        </Link>
      </div>
    </nav>
  );
};

export default SideBarNavigation;
