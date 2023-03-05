import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView/postView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { TReturnPost } from 'src/types';
import { POSTS_PER_PAGE } from 'src/constantValues';
import Link from 'next/link';
import NothingToSeeHere from '@components/common/nothingToSeeHere';

const PostList: FC<{
  userId?: string;
  authorId: string;
  trendingList?: boolean;
  trendingQuery?: string;
}> = ({ userId, authorId, trendingList = false, trendingQuery }) => {
  const [skipPosts, setSkipPosts] = useState(POSTS_PER_PAGE);
  const [postsData, setPostsData] = useState<Array<TReturnPost>>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const postQuery =
    trendingList && trendingQuery
      ? api.trending.getSpecificFromQuery.useQuery({ query: trendingQuery })
      : userId
      ? api.post.listFromUserId.useQuery({ userId: userId })
      : api.post.list.useQuery({});

  const loadMorePostsQuery =
    trendingList && trendingQuery
      ? api.trending.getSpecificFromQuery.useQuery({
          query: trendingQuery,
          skip: skipPosts,
        })
      : userId
      ? api.post.listFromUserId.useQuery({ userId: userId, skip: skipPosts })
      : api.post.list.useQuery({ skip: skipPosts });

  // initial data load
  useEffect(() => {
    if (postQuery.data && postQuery.data.posts) {
      setPostsData((prevPostsData) => [
        ...prevPostsData,
        ...postQuery.data.posts,
      ]);
    }
    return () => {
      setPostsData([]);
    };
  }, [postQuery.data]);

  const loadMorePosts = async () => {
    if (isMore) {
      setSkipPosts((prevSkipPosts) => prevSkipPosts + POSTS_PER_PAGE);
      await loadMorePostsQuery.refetch();
      const newPostsData = loadMorePostsQuery.data?.posts;
      if (newPostsData) {
        if (newPostsData.length === 0) {
          setIsMore(false);
        }
        if (isMore) {
          setPostsData((prevPostsData) => {
            return [...prevPostsData, ...newPostsData];
          });
        }
      }
    }
    setLoadingPosts(false);
  };

  // adding intersection observer
  useEffect(() => {
    const cachedRef = loadMoreRef.current;
    if (cachedRef) {
      const observer = new IntersectionObserver((Entry) => {
        if (Entry[0]?.isIntersecting && !loadingPosts) {
          setLoadingPosts(true);
          loadMorePosts()
            .then(() => undefined)
            .catch(() => undefined);
        }
      });
      observer.observe(cachedRef);
      return () => observer.unobserve(cachedRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreRef.current]);

  if (postQuery.status !== 'success') {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex'>
          <div className='h-8 w-8'>
            <LoadingComponent></LoadingComponent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      {postsData.map((eachPost, index) => {
        return (
          <PostView
            imagePrioriy={index % POSTS_PER_PAGE < 6}
            key={eachPost.id}
            data={eachPost}
            currentUserID={authorId}></PostView>
        );
      })}

      {postsData.length < 1 && <NothingToSeeHere></NothingToSeeHere>}

      {!loadingPosts && isMore && (
        <div className='h-2 w-2' ref={loadMoreRef}></div>
      )}
      {!isMore && !trendingList && !userId && (
        <div className='flex h-full w-full items-center justify-center gap-4 px-3 py-3'>
          <span className='font-mukta leading-none tracking-wide text-themePrimary-50'>
            No more posts to see, check out whats trending today.
          </span>
          <Link href={'/trending'} aria-label='Trending'>
            <button className='btn max-w-[8rem] rounded-lg bg-themePrimary-400/90 py-2 text-sm text-themePrimary-50/95 hover:bg-themePrimary-400'>
              Trending
            </button>
          </Link>
        </div>
      )}
      {loadingPosts && (
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='flex'>
            <div className='h-8 w-8'>
              <LoadingComponent></LoadingComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
