import LoadingComponent from '@components/common/loadingcomponent';
import TrendingItemView from '@components/views/trendingItemView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { TReturnHashtag } from 'src/types';

const TrendingWidget: FC = () => {
  const [trendingHashtagsState, setTrendingHashtagsState] = useState<
    Array<TReturnHashtag>
  >([]);
  const trendingHashtags = api.trending.getCurrentTrending.useQuery({
    take: 3,
  });

  useEffect(() => {
    if (trendingHashtags.data) {
      setTrendingHashtagsState(trendingHashtags.data);
    }
  }, [trendingHashtags.data]);
  return (
    <div className='w-full py-5 pl-3'>
      <header className='mb-4 w-full pl-1'>
        <span className='font-mukta text-xl leading-none tracking-wide text-themePrimary-50'>
          What&apos;s trending
        </span>
      </header>
      <div className=''>
        {trendingHashtags.status !== 'success' && (
          <div className='flex w-full items-center justify-center'>
            <div className='flex'>
              <div className='h-8 w-8'>
                <LoadingComponent></LoadingComponent>
              </div>
            </div>
          </div>
        )}
        {trendingHashtags.status === 'success' &&
          trendingHashtagsState.map((eachHashtag) => (
            <TrendingItemView
              key={eachHashtag.id}
              hashtagData={eachHashtag}></TrendingItemView>
          ))}
      </div>
    </div>
  );
};
export default TrendingWidget;
