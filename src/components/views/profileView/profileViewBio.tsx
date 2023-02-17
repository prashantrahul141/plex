import type { FC } from 'react';

const ProfileViewBio: FC<{ bioText: string | null }> = ({ bioText }) => {
  const parseBio = (text: string) => {
    return text;
  };

  if (bioText) {
    return (
      <span className='mb-1 block whitespace-pre-line font-mukta font-thin leading-snug text-themePrimary-50/95'>
        {parseBio(bioText)}
      </span>
    );
  }
  return <></>;
};

export default ProfileViewBio;
