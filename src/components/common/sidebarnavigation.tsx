import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineBell,
  AiFillBell,
  AiOutlineSetting,
  AiTwotoneSetting,
} from 'react-icons/ai';
import {
  HiOutlinePencil,
  HiPencil,
  HiOutlineGlobe,
  HiGlobe,
  HiOutlineBookmark,
  HiBookmark,
} from 'react-icons/hi';

const SideBarNavigation: FC<{
  activateTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activateTab, authorAvatar, authorName }) => {
  const iconSize = 32;

  const Tabs: Array<{
    name: string;
    link: string;
    inactivateIcon: JSX.Element;
    activateIcon: JSX.Element;
  }> = [
    {
      name: 'Home',
      link: '/home',
      inactivateIcon: (
        <AiOutlineHome
          className='navbar-icon-inactive'
          size={iconSize}></AiOutlineHome>
      ),
      activateIcon: (
        <AiFillHome className='navbar-icon-active' size={iconSize}></AiFillHome>
      ),
    },
    {
      name: 'Create',
      link: '/create',
      inactivateIcon: (
        <HiOutlinePencil
          className='navbar-icon-inactive'
          size={iconSize}></HiOutlinePencil>
      ),
      activateIcon: (
        <HiPencil className='navbar-icon-active' size={iconSize}></HiPencil>
      ),
    },

    {
      name: 'Trending',
      link: '/trending',
      inactivateIcon: (
        <HiOutlineGlobe
          className='navbar-icon-inactive'
          size={iconSize}></HiOutlineGlobe>
      ),
      activateIcon: (
        <HiGlobe className='navbar-icon-active' size={iconSize}></HiGlobe>
      ),
    },

    {
      name: 'Notifications',
      link: '/notifications',
      inactivateIcon: (
        <AiOutlineBell
          className='navbar-icon-inactive'
          size={iconSize}></AiOutlineBell>
      ),
      activateIcon: (
        <AiFillBell className='navbar-icon-active' size={iconSize}></AiFillBell>
      ),
    },
    {
      name: 'Bookmarks',
      link: '/bookmarks',
      inactivateIcon: (
        <HiOutlineBookmark
          className='navbar-icon-inactive'
          size={iconSize}></HiOutlineBookmark>
      ),
      activateIcon: (
        <HiBookmark className='navbar-icon-active' size={iconSize}></HiBookmark>
      ),
    },
    {
      name: 'Settings',
      link: '/settings',
      inactivateIcon: (
        <AiOutlineSetting
          className='navbar-icon-inactive'
          size={iconSize}></AiOutlineSetting>
      ),
      activateIcon: (
        <AiTwotoneSetting
          className='navbar-icon-active'
          size={iconSize}></AiTwotoneSetting>
      ),
    },
  ];

  return (
    <nav className='flex h-screen w-max flex-col'>
      {Tabs.map((eachTab, index) => {
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
      <div className='my-3 flex'>
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
