import Link from 'next/link';
import type { FC } from 'react';
import reactStringReplace from 'react-string-replace';
import { HASHTAG_REGEX_EXP, USERNAME_REGEX_EXP } from 'src/constantValues';

const PostViewText: FC<{ text: string }> = ({ text }) => {
  let output = reactStringReplace(text, HASHTAG_REGEX_EXP, (match, i) => {
    return (
      <Link
        key={match + i.toString()}
        title={match}
        className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
        href={`/trending?q=${match.substring(1, match.length)}`}>
        {match}
      </Link>
    );
  });

  output = reactStringReplace(output, USERNAME_REGEX_EXP, (match, i) => {
    return (
      <Link
        title={match}
        key={match + i.toString()}
        className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
        href={`/${match.substring(1, match.length)}`}>
        {match}
      </Link>
    );
  });
  return <>{output}</>;
};

export default PostViewText;
