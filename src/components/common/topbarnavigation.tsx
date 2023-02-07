import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import { getNavMenuTabs } from 'src/constants';
import { AnimatePresence, motion } from 'framer-motion';

const TopBarNavigation: FC<{
  activeTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activeTab, authorAvatar, authorName }) => {
  const [showNavBarMenu, setShowNavBarMenu] = useState(false);

  return (
    <nav className='relative flex h-max w-full max-w-6xl'>
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
          {showNavBarMenu && (
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
                className={`absolute z-10 rounded-md border border-themePrimary-50/10 p-2 backdrop-blur-md`}>
                {getNavMenuTabs(24).map((eachMenuTab, index) => {
                  return (
                    <Link
                      href={eachMenuTab.link}
                      key={index}
                      className={`flex items-center rounded-md py-1 px-2 ${
                        activeTab === eachMenuTab.name
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
                          activeTab === eachMenuTab.name
                            ? 'text-themePrimary-50'
                            : 'text-themePrimary-50/60'
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
      </div>
    </nav>
  );
};

export default TopBarNavigation;
