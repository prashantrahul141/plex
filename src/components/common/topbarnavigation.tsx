import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { getNavMenuTabs } from 'src/constants';
import { AnimatePresence, motion } from 'framer-motion';
import CreatePostForm from '@components/forms/createpostform';
import { HiOutlinePencil } from 'react-icons/hi';

const TopBarNavigation: FC<{
  activeTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activeTab, authorAvatar, authorName }) => {
  const [showNavBarMenu, setShowNavBarMenu] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  return (
    <nav className='relative flex h-12 w-full max-w-6xl select-none pt-2 backdrop-blur-sm backdrop-brightness-75'>
      <Link href={'/'} className='absolute left-2'>
        <Image alt='Plex' src={'/favicon.ico'} width={32} height={32}></Image>
      </Link>

      <div
        onClick={() => {
          setShowNavBarMenu(!showNavBarMenu);
        }}
        className='absolute right-2 flex cursor-pointer items-center'>
        <Image
          className='w-8 rounded-full border-2 border-baseBackground-100'
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
              <div
                className='fixed top-0 left-0 -z-10 h-screen w-screen cursor-default'
                id='navbar-backdrop'></div>

              <motion.div
                initial={{ top: -80, right: -30, opacity: 0, scale: 0 }}
                animate={{ top: '100%', right: 30, opacity: 100, scale: 1 }}
                exit={{ top: -80, right: -30, opacity: 0, scale: 0 }}
                transition={{
                  type: 'spring',
                  duration: 0.3,
                }}
                className={`absolute z-10 rounded-md border border-themePrimary-50/10 bg-baseBackground-100/95 p-2`}>
                <div
                  onClick={() => setShowCreatePostForm(true)}
                  className={`flex items-center rounded-md py-1 px-2 `}>
                  <i>
                    <HiOutlinePencil
                      size={24}
                      className='navbar-icon-inactive'></HiOutlinePencil>
                  </i>
                  <span className={`ml-2 font-mukta text-themePrimary-50/70 `}>
                    create
                  </span>
                </div>

                {getNavMenuTabs(24).map((eachMenuTab, index) => {
                  return (
                    <Link
                      href={eachMenuTab.link}
                      key={index}
                      className={`flex items-center rounded-md py-1 px-2 ${
                        activeTab === eachMenuTab.name.toLowerCase()
                          ? 'bg-themePrimary-50/10'
                          : ''
                      }`}>
                      <i>
                        {activeTab === eachMenuTab.name
                          ? eachMenuTab.activateIcon
                          : eachMenuTab.inactivateIcon}
                      </i>
                      <span
                        className={`ml-2 font-mukta ${
                          activeTab === eachMenuTab.name.toLowerCase()
                            ? 'text-themePrimary-50'
                            : 'text-themePrimary-50/70'
                        }`}>
                        {eachMenuTab.name}
                      </span>
                    </Link>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCreatePostForm && (
            <>
              <div
                onClick={() => setShowCreatePostForm(false)}
                className='fixed top-0 left-0 z-40 h-screen w-screen backdrop-brightness-75'></div>
              <motion.div className='fixed top-40 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-center'>
                <CreatePostForm></CreatePostForm>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default TopBarNavigation;
