import type {
  Post,
  LikedByAuthor,
  BookmarkedByAuthor,
  CommentLikedByAuthor,
  Follows,
  Hashtag,
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
  id: string;
  name: string;
  username: string;
  bio: string | null;
  image: string;
  authorVerified: boolean;
}

type TReturnPost = Post & {
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
  id: string;
  _count: {
    CommentLikedByAuthor: number;
  };
  CommentLikedByAuthor: Array<CommentLikedByAuthor>;
  createdOn: Date;
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

type TReturnHashtag = Hashtag & { _count: { HashtagOnPost: number } };

type IReturnHashTagOnPost = Array<{
  Hashtag: {
    connectOrCreate: {
      where: { text: string };
      create: { text: string };
    };
  };
}>;

export type {
  IReturnUser,
  TReturnPost,
  IReturnUserEdit,
  IEditFormInput,
  IFormInput,
  IReturnSmallUser,
  IReturnComment,
  IPostComment,
  TReturnHashtag,
  IReturnHashTagOnPost,
};
