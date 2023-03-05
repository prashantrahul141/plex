import Link from 'next/link';
import type { FC } from 'react';
import type { TReturnHashtag } from 'src/types';

const TrendintItemView: FC<{
  hashtagData: TReturnHashtag;
}> = ({ hashtagData }) => {
  return (
    <Link href={`/trending?q=${hashtagData.text}`}>
      <article className='rounded-xs group rounded-md py-1 pl-4 pr-3 hover:bg-baseBackground-100/50'>
        <span className='font-ibmplex text-xs tracking-wide text-themePrimary-50/50 group-hover:text-themePrimary-50/70'>
          <span className='tracking-tighter'>
            {hashtagData._count.HashtagOnPost}
          </span>
          &nbsp;Posts
        </span>

        <h2 className='my-[.1rem] font-mukta text-2xl font-bold leading-tight tracking-wider text-themePrimary-50/80'>
          #{hashtagData.text}
        </h2>

        {hashtagData.subtext && (
          <h3 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/50 group-hover:text-themePrimary-50/70'>
            {hashtagData.subtext}
          </h3>
        )}
        {!hashtagData.subtext && (
          <h3 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/50 group-hover:text-themePrimary-50/70'>
            See posts about {`#${hashtagData.text}`}
          </h3>
        )}
      </article>
    </Link>
  );
};

export default TrendintItemView;
