import Link from 'next/link';
import type { FC } from 'react';

const TrendingSideView: FC<{
  hashTag: string;
  postsNumber: number;
  subText?: string;
}> = ({ hashTag, postsNumber, subText }) => {
  return (
    <article className='rounded-xs group bg-baseBackground-100/80 p-2 hover:bg-baseBackground-100'>
      <Link className='' href={`/trending?query=${hashTag}`}>
        <span className=' font-ibmplex text-xs text-themePrimary-50/40'>
          {postsNumber} Posts
        </span>

        <h2 className='my-[1px] font-mukta text-xl tracking-wider text-themePrimary-400 group-hover:text-themePrimary-300'>
          #{hashTag}
        </h2>

        {subText && (
          <h5 className='font-mukta text-sm font-thin leading-tight tracking-wide text-themePrimary-50/40'>
            {subText}
          </h5>
        )}
      </Link>
    </article>
  );
};

export default TrendingSideView;
