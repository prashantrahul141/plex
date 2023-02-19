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

interface IReturnSmallUser {
  name: string;
  username: string;
  bio: string | null;
  image: string;
  authorVerified: boolean;
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
}

interface IFormInput {
  postText: string;
  postImages: {
    public_id: string;
    version_number: number;
    signature: string;
  } | null;
}

interface IReturnComment {
  _count: {
    CommentLikedByAuthor: number;
  };
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
    authorVerified: boolean;
  };
  commentText: string;
}

interface IPostComment {
  commentText: string;
}

export type {
  IReturnUser,
  IReturnPost,
  IReturnUserEdit,
  IEditFormInput,
  IFormInput,
  IReturnSmallUser,
  IReturnComment,
  IPostComment,
};
