import type { FC } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { MdVerified } from 'react-icons/md';

const SmallProfileView: FC<{
  userAvatar: string;
  userName: string;
  userUsername: string;
  userBio: string;
  userVerified: boolean;
  isAuthor: boolean;
  isFollowed: boolean;
}> = ({
  userAvatar,
  userName,
  userUsername,
  userBio,
  userVerified,
  isAuthor,
  isFollowed,
}) => {
  const [following, setFollowing] = useState(isFollowed);

  const handleFollow = () => {
    setFollowing(!following);
    // TODO: Handle follow
  };

  return (
    <article className='flex'>
      <div className=''>
        <Image
          className='w-12 rounded-full'
          width={50}
          height={50}
          alt={userUsername}
          src={userAvatar}></Image>
      </div>
      <main className='relative flex-grow pt-1 pl-2'>
        <header className=''>
          <span className='flex gap-1 font-mukta text-xl leading-none tracking-wider text-themePrimary-50'>
            {userName}{' '}
            {userVerified && (
              <span className='group/verified relative'>
                <MdVerified></MdVerified>
                <span className='absolute left-1/2 top-6 hidden w-max -translate-x-1/2 rounded-md border border-none bg-black/90 px-2 py-1 font-mukta text-xs font-thin tracking-wide text-themePrimary-50/90 group-hover/verified:block'>
                  This user is verified by the plex team.
                </span>
              </span>
            )}
          </span>
          <span className='font-ibmplex text-sm leading-none tracking-wide text-themePrimary-50/60'>
            @{userUsername}
          </span>
        </header>
        {!isAuthor && (
          <span className='absolute top-2 right-2 '>
            <button
              onClick={handleFollow}
              className={`btn w-fit rounded-3xl px-3 font-mukta text-sm ${
                following ? 'bg-themePrimary-300 text-themePrimary-50/90' : ''
              }`}>
              {following ? 'Following' : 'Follow'}
            </button>
          </span>
        )}
        <div className='mt-3'>
          <p className='font-mukta font-thin leading-tight tracking-wide text-themePrimary-50/95'>
            {userBio}
          </p>
        </div>
      </main>
    </article>
  );
};

export default SmallProfileView;
