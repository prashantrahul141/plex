import type { FC } from 'react';
import { useRouter } from 'next/router';
import type { Session } from 'next-auth';
import PostList from './postsList';

const TrendingList: FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const { q } = router.query;

  // sets idToFind to username or id of current user.
  let queryToFind: null | string = null;

  // if viewing other's profile
  if (typeof q === 'string') {
    queryToFind = q;
  } else if (Array.isArray(q) && q[0] !== undefined) {
    queryToFind = q[0];
  }

  return (
    <>
      <PostList
        authorId={session.user.id}
        trendingList={true}
        trendingQuery={queryToFind}></PostList>
    </>
  );
};

export default TrendingList;
