import type { FC } from 'react';
import { hashtagReplace, urlReplace, usernameReplace } from '@utils/tsxUtils';

const ProfileViewBio: FC<{
  bioText: string | null;
  preserveWhitespace?: boolean;
}> = ({ bioText, preserveWhitespace = true }) => {
  const parseBio = (text: string) => {
    const output = urlReplace(hashtagReplace(usernameReplace(text)));
    return output;
  };

  if (bioText) {
    return (
      <span
        className={`mb-1 block font-mukta font-thin leading-snug tracking-wide text-themePrimary-50/95 ${
          preserveWhitespace ? 'whitespace-pre-line' : ''
        }`}>
        {parseBio(bioText)}
      </span>
    );
  }
  return <></>;
};

export default ProfileViewBio;
