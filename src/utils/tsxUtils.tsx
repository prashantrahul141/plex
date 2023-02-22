import Link from 'next/link';
import React from 'react';
import reactStringReplace from 'react-string-replace';
import {
  HASHTAG_REGEX_EXP,
  URL_REGEX_EXP,
  USERNAME_REGEX_EXP,
} from 'src/constantValues';

export const hashtagReplace = (
  text: string | React.ReactNode[] | undefined | React.ReactNodeArray
) => {
  return reactStringReplace(text, HASHTAG_REGEX_EXP, (match, i) => {
    return (
      <Link
        key={match + i.toString()}
        title={'#' + match}
        className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
        href={`/trending?q=${match}`}>
        #{match}
      </Link>
    );
  });
};

export const usernameReplace = (
  text: string | React.ReactNode[] | undefined | React.ReactNodeArray
) => {
  return reactStringReplace(text, USERNAME_REGEX_EXP, (match, i) => {
    return (
      <Link
        title={'@' + match}
        key={match + i.toString()}
        className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
        href={`/${match}`}>
        @{match}
      </Link>
    );
  });
};

export const urlReplace = (
  text: string | React.ReactNode[] | undefined | React.ReactNodeArray
) => {
  return reactStringReplace(text, URL_REGEX_EXP, (match, i) => {
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
  });
};
