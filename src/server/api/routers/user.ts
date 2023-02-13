import { prisma } from 'src/server/db';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const UserRouter = createTRPCRouter({
  getFromId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const foundUser = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          banner: true,
          url: true,
          bio: true,
          joinedOn: true,
          authorVerified: true,
          _count: { select: { followers: true, followings: true } },
        },
      });
      if (foundUser) {
        foundUser.id;
      }

      return {
        foundUser,
        isAuthor: foundUser ? foundUser.id === ctx.session?.user.id : false,
      };
    }),

  get: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const foundUser = await prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          banner: true,
          url: true,
          bio: true,
          joinedOn: true,
          authorVerified: true,
          _count: { select: { followers: true, followings: true } },
        },
      });
      if (foundUser) {
        foundUser.id;
      }

      return {
        foundUser,
        isAuthor: foundUser ? foundUser.id === ctx.session?.user.id : false,
      };
    }),
});
