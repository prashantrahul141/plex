import Link from 'next/link';
import type { FC } from 'react';
import type { TReturnHashtag } from 'src/types';

const TrendintItemView: FC<{
  hashtagData: TReturnHashtag;
}> = ({ hashtagData }) => {
  return (
    <article className='rounded-xs group bg-baseBackground-100/80 p-2 hover:bg-baseBackground-100'>
      <Link className='' href={`/trending?q=${hashtagData.text}`}>
        <span className=' font-ibmplex text-xs text-themePrimary-50/40'>
          {hashtagData._count.HashtagOnPost} Posts
        </span>

        <h2 className='my-[1px] font-mukta text-xl tracking-wider text-themePrimary-400 group-hover:text-themePrimary-300'>
          #{hashtagData.text}
        </h2>

        {hashtagData.subtext && (
          <h5 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/40'>
            {hashtagData.subtext}
          </h5>
        )}
      </Link>
    </article>
  );
};

export default TrendintItemView;
