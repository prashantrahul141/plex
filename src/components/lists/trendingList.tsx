import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { Session } from 'next-auth';
import PostList from './postsList';
import { api } from '@utils/api';
import TrendingItemView from '@components/views/trendingItemView';
import type { TReturnHashtag } from 'src/types';
import NothingToSeeHere from '@components/common/nothingToSeeHere';

const TrendingList: FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const { q } = router.query;
  const [trendingListState, setTrendingListState] = useState<
    Array<TReturnHashtag>
  >([]);

  let queryToFind: null | string = null;

  // if viewing specific hastag
  if (typeof q === 'string') {
    queryToFind = q;
  } else if (Array.isArray(q) && q[0] !== undefined) {
    queryToFind = q[0];
  }

  const trendingListQuery = api.trending.getCurrentTrending.useQuery(
    { take: 10 },
    {
      enabled: !queryToFind,
    }
  );

  useEffect(() => {
    if (trendingListQuery.data) {
      setTrendingListState(trendingListQuery.data);
    }
  }, [trendingListQuery.data]);

  return (
    <>
      {queryToFind && (
        <PostList
          authorId={session.user.id}
          trendingList={true}
          trendingQuery={queryToFind}></PostList>
      )}
      {!queryToFind &&
        trendingListState.map((eachTrending) => (
          <TrendingItemView
            key={eachTrending.id}
            hashtagData={eachTrending}></TrendingItemView>
        ))}

      {!queryToFind && trendingListState.length < 1 && (
        <NothingToSeeHere></NothingToSeeHere>
      )}
    </>
  );
};

export default TrendingList;
