import type {
  Post,
  LikedByAuthor,
  BookmarkedByAuthor,
  Follows,
} from '@prisma/client';

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
    BookmarkedByAuthor: BookmarkedByAuthor[];
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

interface IReturnUserEdit {
  name: string;
  username: string;
  image: string;
  url: string | null;
  banner: string;
  bio: string | null;
}

interface IEditFormInput {
  name: string;
  username: string;
  url: string | null;
  bio: string | null;
  image: string | null;
  banner: string | null;
}

export type { IReturnUser, IReturnPost, IReturnUserEdit, IEditFormInput };
