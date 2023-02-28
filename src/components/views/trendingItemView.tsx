import Link from 'next/link';
import type { FC } from 'react';
import type { TReturnHashtag } from 'src/types';

const TrendintItemView: FC<{
  hashtagData: TReturnHashtag;
}> = ({ hashtagData }) => {
  return (
    <article className='rounded-xs group border-b border-b-themePrimary-100/10 bg-baseBackground-100/20 py-3 px-4 hover:bg-baseBackground-100'>
      <Link className='' href={`/trending?q=${hashtagData.text}`}>
        <span className='font-ibmplex text-xs tracking-wide text-themePrimary-50/40 group-hover:text-themePrimary-50/50'>
          <span className='tracking-tighter'>
            {hashtagData._count.HashtagOnPost}
          </span>
          &nbsp;Posts
        </span>

        <h2 className='my-[.2rem] font-mukta text-2xl font-bold tracking-wider text-themePrimary-50/80 group-hover:text-themePrimary-300'>
          #{hashtagData.text}
        </h2>

        {hashtagData.subtext && (
          <h5 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/30 group-hover:text-themePrimary-50/50'>
            {hashtagData.subtext}
          </h5>
        )}
        {!hashtagData.subtext && (
          <h5 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/30 group-hover:text-themePrimary-50/50'>
            See posts about {`#${hashtagData.text}`}
          </h5>
        )}
      </Link>
    </article>
  );
};

export default TrendintItemView;
