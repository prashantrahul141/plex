interface IReturnUser {
  foundUser: {
    username: string;
    _count: {
      followers: number;
      followings: number;
    };
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

export type { IReturnUser };
