import LoadingComponent from '@components/common/loadingcomponent';
import PostView from '@components/views/postView';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { TReturnPost } from 'src/types';
import POSTS_PER_PAGE from 'src/constantValues';

const PostList: FC<{ userId?: string; authorId: string }> = ({
  userId,
  authorId,
}) => {
  const [skipPosts, setSkipPosts] = useState(POSTS_PER_PAGE);
  const [postsData, setPostsData] = useState<Array<TReturnPost>>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const postQuery = userId
    ? api.post.listFromUserId.useQuery({ userId: userId })
    : api.post.list.useQuery({});

  const loadMorePostsQuery = userId
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
            .then(() => {
              console.log();
            })
            .catch(() => {
              console.log();
            });
        }
      });
      observer.observe(cachedRef);
      return () => observer.unobserve(cachedRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreRef.current]);

  if (postQuery.status !== 'success') {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='h-8 w-8'>
          <LoadingComponent></LoadingComponent>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      {postsData.map((eachPost) => {
        return (
          <PostView
            key={eachPost.id}
            data={eachPost}
            currentUserID={authorId}></PostView>
        );
      })}
      {!loadingPosts && isMore && (
        <div className='h-2 w-2' ref={loadMoreRef}></div>
      )}
      {loadingPosts && (
        <div className='flex h-12 w-full items-center justify-center'>
          <div className='h-8 w-8'>
            <LoadingComponent></LoadingComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
