import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { getNavMenuTabs } from 'src/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlinePencil, HiPencil } from 'react-icons/hi';
import CreatePostForm from '@components/forms/createpostform';

const SideBarNavigation: FC<{
  activeTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activeTab, authorAvatar, authorName }) => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  return (
    <nav className='flex h-screen w-max flex-col border-r border-themePrimary-100/40 px-4 pt-4'>
      <div className='mb-8 mt-2 select-none'>
        <Link href={'/'}>
          <Image
            priority
            src='/favicon.ico'
            width={32}
            height={32}
            alt='Plex'></Image>
        </Link>
      </div>

      <div
        className='my-3 flex cursor-pointer'
        onClick={() => setShowCreatePostForm(true)}>
        <i className='group relative flex items-center'>
          {!showCreatePostForm && (
            <HiOutlinePencil
              size={32}
              className='navbar-icon-inactive'></HiOutlinePencil>
          )}
          {showCreatePostForm && (
            <HiPencil size={32} className='navbar-icon-active'></HiPencil>
          )}
          <span className='absolute left-full z-50 ml-1 hidden rounded-md bg-themePrimary-50/70 px-1  font-mukta text-sm not-italic leading-relaxed text-black group-hover:block'>
            Create
          </span>
        </i>
      </div>

      {getNavMenuTabs().map((eachTab, index) => {
        return (
          <div key={index} className='my-3 flex'>
            <Link href={eachTab.link}>
              <i className='group relative flex items-center'>
                {activeTab.toLowerCase() === eachTab.name.toLowerCase()
                  ? eachTab.activateIcon
                  : eachTab.inactivateIcon}
                <span className='absolute left-full z-50 ml-1 hidden rounded-md bg-themePrimary-50/70 px-1  font-mukta text-sm not-italic leading-relaxed text-black group-hover:block'>
                  {eachTab.name}
                </span>
              </i>
            </Link>
          </div>
        );
      })}

      <div className='mb-9 flex flex-grow items-end'>
        <Link href={'/profile'}>
          <i className='group relative flex items-center'>
            <Image
              className='w-8 rounded-full border-2'
              src={authorAvatar}
              width={50}
              height={50}
              alt={authorName}></Image>
            <span className='absolute left-full z-50 ml-1 hidden w-max rounded-md bg-themePrimary-50/70 px-1 font-mukta text-sm not-italic leading-relaxed text-black group-hover:block'>
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
