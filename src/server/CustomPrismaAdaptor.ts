import type { PrismaClient } from '@prisma/client';
import type { Adapter, AdapterAccount } from 'next-auth/adapters';

const makeUsername = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: (data) => {
      return p.user.create({
        // @ts-ignore
        data: {
          ...data,
          username: makeUsername(16),
          settings: { create: {} },
          followings: {
            create: { following: { connect: { username: 'plex' } } },
          },
          notifications: {
            create: {
              text: 'Welcome to Plex, View your profile here.',
              url: '/profile',
            },
          },
        },
      });
    },

    getUser: (id) => p.user.findUnique({ where: { id } }),

    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),

    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return account?.user ?? null;
    },

    // @ts-ignore
    updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),

    deleteUser: (id) => p.user.delete({ where: { id } }),

    linkAccount: (data) =>
      p.account.create({ data }) as unknown as AdapterAccount,

    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,

    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },

    createSession: (data) => p.session.create({ data }),

    updateSession: (data) =>
      p.session.update({ where: { sessionToken: data.sessionToken }, data }),

    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
  };
}
