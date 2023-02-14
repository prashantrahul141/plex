import type { Post, LikedByAuthor, Follows } from '@prisma/client';

interface IReturnUser {
  foundUser: {
    username: string;
    _count: {
      followers: number;
      followings: number;
    };
    followers: Follows[];
    id: string;
    name: string;
    image: string;
    joinedOn: Date;
    authorVerified: boolean;
    url: string | null;
    banner: string;
    bio: string | null;
  } | null;
  isAuthor: boolean;
}

interface IReturnPost {
  post: Post & {
    LikedByAuthor: LikedByAuthor[];
    _count: {
      LikedByAuthor: number;
      Comments: number;
    };
    Author: {
      id: string;
      name: string;
      username: string;
      image: string;
      authorVerified: boolean;
    };
  };
}

export type { IReturnUser, IReturnPost };
