import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { getNavMenuTabs } from 'src/constants';
import { AnimatePresence, motion } from 'framer-motion';
import CreatePostForm from '@components/forms/createpost/createpostform';
import { HiOutlinePencil } from 'react-icons/hi';
import { api } from '@utils/api';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';

const TopBarNavigation: FC<{
  activeTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activeTab, authorAvatar, authorName }) => {
  const [showNavBarMenu, setShowNavBarMenu] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const unseenNotifications = api.notification.getUnseenNumber.useQuery();

  return (
    <nav className='relative flex h-16 w-full select-none pt-2 backdrop-blur-sm backdrop-brightness-75'>
      <Link href={'/'} className='absolute left-2 select-none'>
        <Image
          priority
          alt='Plex'
          src={'/favicon.ico'}
          width={44}
          height={44}></Image>
      </Link>

      <button
        onClick={() => {
          setShowNavBarMenu(!showNavBarMenu);
        }}
        className='absolute right-2 flex cursor-pointer items-center'>
        <Image
          className='h-12 w-12 rounded-full border-2 border-baseBackground-100 object-cover'
          alt={authorName}
          src={authorAvatar}
          width={32}
          height={32}></Image>
        &nbsp;
        <span className='select-none text-[8px] text-themePrimary-50/70'>
          &#9660;
        </span>
        <AnimatePresence>
          {showNavBarMenu && !showCreatePostForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                }}
                className='fixed top-0 left-0 -z-10 h-screen w-screen cursor-default bg-black/50'
                id='navbar-backdrop'></motion.div>

              <motion.div
                initial={{ top: -80, right: -30, opacity: 0, scale: 0 }}
                animate={{ top: '100%', right: 30, opacity: 100, scale: 1 }}
                exit={{ top: -80, right: -30, opacity: 0, scale: 0 }}
                transition={{
                  type: 'spring',
                  duration: 0.3,
                }}
                className={`absolute z-10 flex flex-col gap-[.18rem] rounded-md border border-themePrimary-50/10 bg-baseBackground-100 p-2 pr-3`}>
                <div
                  onClick={() => setShowCreatePostForm(true)}
                  className={`flex items-center rounded-md py-1 px-2 `}>
                  <i>
                    <HiOutlinePencil
                      size={28}
                      className='navbar-icon-inactive'></HiOutlinePencil>
                  </i>
                  <span
                    className={`ml-2 font-mukta text-lg tracking-wider text-themePrimary-50/70 `}>
                    Create
                  </span>
                </div>

                {getNavMenuTabs(28).map((eachMenuTab, index) => {
                  return (
                    <Link
                      href={eachMenuTab.link}
                      key={index}
                      aria-label={eachMenuTab.name}
                      className={`flex items-center rounded-md py-1 px-2 ${
                        activeTab.toLowerCase() ===
                        eachMenuTab.name.toLowerCase()
                          ? 'bg-themePrimary-50/10'
                          : ''
                      }`}>
                      <i>
                        {activeTab.toLowerCase() ===
                        eachMenuTab.name.toLowerCase()
                          ? eachMenuTab.activateIcon
                          : eachMenuTab.inactivateIcon}
                      </i>
                      <span
                        className={`ml-2 font-mukta text-lg tracking-wider ${
                          activeTab === eachMenuTab.name.toLowerCase()
                            ? 'text-themePrimary-50'
                            : 'text-themePrimary-50/70'
                        }`}>
                        {eachMenuTab.name}
                      </span>
                      {eachMenuTab.name === 'Notifications' &&
                        unseenNotifications.data !== undefined &&
                        unseenNotifications.data > 0 && (
                          <span className='right-0 z-10 ml-1 flex h-fit min-h-[1.1rem] w-fit min-w-[1.1rem] items-center justify-center rounded-full bg-themePrimary-400 font-ibmplex text-[.5rem] not-italic leading-none text-themePrimary-50'>
                            {unseenNotifications.data}
                          </span>
                        )}
                    </Link>
                  );
                })}

                <Link
                  href={'/profile'}
                  key={10}
                  aria-label={'Profile'}
                  className={`flex items-center rounded-md py-1 px-2 ${
                    activeTab.toLowerCase() === 'profile'.toLowerCase()
                      ? 'bg-themePrimary-50/10'
                      : ''
                  }`}>
                  <i>
                    {activeTab.toLowerCase() === 'profile'.toLowerCase() ? (
                      <IoPersonCircleSharp
                        className='navbar-icon-active'
                        size={28}></IoPersonCircleSharp>
                    ) : (
                      <IoPersonCircleOutline
                        className='navbar-icon-inactive'
                        size={28}></IoPersonCircleOutline>
                    )}
                  </i>
                  <span
                    className={`ml-2 font-mukta text-lg tracking-wider ${
                      activeTab === 'profile'.toLowerCase()
                        ? 'text-themePrimary-50'
                        : 'text-themePrimary-50/70'
                    }`}>
                    {'Profile'}
                  </span>
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
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
                className='fixed top-0 left-0 z-40 h-screen w-screen cursor-default bg-black/50'></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  translateX: '-50%',
                }}
                exit={{ opacity: 0, scale: 0, translateX: '-75%' }}
                transition={{ type: 'spring', duration: 0.4 }}
                className='fixed top-40 left-1/2 z-50 flex w-full -translate-x-1/2 cursor-default items-center justify-center'>
                <CreatePostForm
                  formSetCallback={(value: boolean) =>
                    setShowCreatePostForm(value)
                  }></CreatePostForm>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </button>
    </nav>
  );
};

export default TopBarNavigation;
