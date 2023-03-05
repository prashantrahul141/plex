import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { getNavMenuTabs } from 'src/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlinePencil, HiPencil } from 'react-icons/hi';
import CreatePostForm from '@components/forms/createpost/createpostform';
import { api } from '@utils/api';
import NavigationIcon from './navigationIcon';

const SideBarNavigation: FC<{
  activeTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activeTab, authorAvatar, authorName }) => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const iconSize = 28;

  const unseenNotifications = api.notification.getUnseenNumber.useQuery();

  return (
    <nav className='flex h-screen w-max flex-col border-r border-themePrimary-100/40 px-4 pt-4 lg:px-12'>
      <NavigationIcon></NavigationIcon>

      <div
        className='my-3 flex cursor-pointer justify-center lg:justify-start'
        onClick={() => setShowCreatePostForm(true)}>
        <i className='group relative flex items-center'>
          {!showCreatePostForm && (
            <HiOutlinePencil
              size={iconSize}
              className='navbar-icon-inactive'></HiOutlinePencil>
          )}
          {showCreatePostForm && (
            <HiPencil size={iconSize} className='navbar-icon-active'></HiPencil>
          )}
          <span className='absolute left-full z-50 ml-1 hidden rounded-md bg-themePrimary-50/70 px-1 font-mukta text-sm not-italic leading-relaxed text-black group-hover:block lg:group-hover:hidden'>
            Create
          </span>
          <span
            className={`ml-2 hidden font-mukta text-lg font-thin not-italic tracking-wide duration-150 ease-in-out group-hover:text-themePrimary-50 lg:block ${
              showCreatePostForm
                ? 'text-themePrimary-50'
                : 'text-themePrimary-50/60'
            }`}>
            Create
          </span>
        </i>
      </div>

      {getNavMenuTabs(iconSize).map((eachTab, index) => {
        return (
          <div
            key={index}
            className={`my-2 flex justify-center rounded-md px-1 py-1 lg:justify-start ${
              activeTab.toLowerCase() === eachTab.name.toLowerCase()
                ? 'bg-themePrimary-50/10'
                : ''
            }`}>
            <Link href={eachTab.link} aria-label={eachTab.name}>
              <i className='group relative flex items-center'>
                {activeTab.toLowerCase() === eachTab.name.toLowerCase()
                  ? eachTab.activateIcon
                  : eachTab.inactivateIcon}
                <span className='absolute left-full z-50 ml-1 hidden rounded-md bg-themePrimary-50/70 px-1 font-mukta text-sm  not-italic leading-relaxed text-black group-hover:block lg:group-hover:hidden'>
                  {eachTab.name}
                </span>
                {eachTab.name === 'Notifications' &&
                  unseenNotifications.data !== undefined &&
                  unseenNotifications.data > 0 && (
                    <span className='absolute top-0 right-0 z-10 flex h-fit min-h-[1.1rem] w-fit min-w-[1.1rem] items-center justify-center rounded-full bg-themePrimary-400 font-ibmplex text-[.5rem] not-italic leading-none text-themePrimary-50 lg:left-3 lg:top-0'>
                      {unseenNotifications.data}
                    </span>
                  )}
                <span
                  className={`ml-2 hidden font-mukta text-lg font-thin not-italic tracking-wide duration-150 ease-in-out group-hover:text-themePrimary-50 lg:block ${
                    activeTab.toLowerCase() === eachTab.name.toLowerCase()
                      ? 'text-themePrimary-50'
                      : 'text-themePrimary-50/60'
                  }`}>
                  {eachTab.name}
                </span>
              </i>
            </Link>
          </div>
        );
      })}

      <div className='mb-9 flex flex-grow items-end'>
        <Link
          href={'/profile'}
          className={`rounded-md px-2 py-1 ${
            activeTab.toLowerCase() === 'profile'
              ? 'bg-themePrimary-50/10 text-themePrimary-50'
              : 'text-themePrimary-50/60'
          }`}>
          <i className='group relative flex items-center'>
            <Image
              className='border-1 h-8 w-8 rounded-full border-baseBackground-100 object-cover'
              src={authorAvatar}
              width={50}
              height={50}
              alt={authorName}></Image>
            <span className='absolute left-full z-50 ml-1 hidden w-max rounded-md bg-themePrimary-50/70 px-1 font-mukta text-sm not-italic leading-relaxed text-black group-hover:block lg:group-hover:hidden'>
              {authorName}
            </span>
            <span
              className={`ml-2 hidden font-mukta text-base font-thin not-italic tracking-wide duration-150 ease-in-out group-hover:text-themePrimary-50 lg:block ${
                activeTab.toLowerCase() === 'profile'
                  ? 'text-themePrimary-50'
                  : 'text-themePrimary-50/80'
              }`}>
              {authorName}
            </span>
          </i>
        </Link>
      </div>

      <AnimatePresence>
        {showCreatePostForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowCreatePostForm(false)}
              className='fixed top-0 left-0 z-40 h-screen w-screen cursor-default backdrop-brightness-50'></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                translateX: '-50%',
              }}
              exit={{ opacity: 0, scale: 0, translateX: '-75%' }}
              transition={{ type: 'spring', duration: 0.4 }}
              className='fixed top-12 left-1/2 z-50 flex w-fit -translate-x-1/2  cursor-default items-center justify-center'>
              <CreatePostForm
                formSetCallback={(value: boolean) =>
                  setShowCreatePostForm(value)
                }></CreatePostForm>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SideBarNavigation;
