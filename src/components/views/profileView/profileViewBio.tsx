import type { FC } from 'react';
import Link from 'next/link';
import reactStringReplace from 'react-string-replace';
import {
  HASHTAG_REGEX_EXP,
  URL_REGEX_EXP,
  USERNAME_REGEX_EXP,
} from 'src/constantValues';

const ProfileViewBio: FC<{
  bioText: string | null;
  preserveWhitespace?: boolean;
}> = ({ bioText, preserveWhitespace = true }) => {
  const parseBio = (text: string) => {
    const mentionedText = reactStringReplace(
      text,
      USERNAME_REGEX_EXP,
      (match, i) => {
        return (
          <Link
            title={match}
            key={match + i.toString()}
            className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
            href={`/${match.substring(1, match.length)}`}>
            {match}
          </Link>
        );
      }
    );

    const hashtagedText = reactStringReplace(
      mentionedText,
      HASHTAG_REGEX_EXP,
      (match, i) => {
        return (
          <Link
            key={match + i.toString()}
            title={match}
            className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
            href={`/trending?q=${match.substring(1, match.length)}`}>
            {match}
          </Link>
        );
      }
    );

    const urlText = reactStringReplace(
      hashtagedText,
      URL_REGEX_EXP,
      (match, i) => {
        try {
          const url = new URL(match);
          return (
            <Link
              title={match}
              key={match + i.toString()}
              className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
              href={url}>
              {url.hostname}
            </Link>
          );
        } catch {
          return match;
        }
      }
    );

    return urlText;
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
