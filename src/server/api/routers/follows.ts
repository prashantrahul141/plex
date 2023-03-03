import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const FollowsRouter = createTRPCRouter({
  // get current author's followers
  getAuthorFollowers: protectedProcedure.query(async ({ ctx }) => {
    const follows = await prisma.follows.findMany({
      where: {
        followingId: ctx.session.user.id,
      },
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            image: true,
            authorVerified: true,
          },
        },
      },
    });

    return {
      follows: follows.map((eachFollow) => {
        return eachFollow.follower;
      }),
    };
  }),

  // get current author's followings
  getAuthorFollowings: protectedProcedure.query(async ({ ctx }) => {
    const follows = await prisma.follows.findMany({
      where: {
        followerId: ctx.session.user.id,
      },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            image: true,
            authorVerified: true,
          },
        },
      },
    });

    return {
      follows: follows.map((eachFollow) => {
        return eachFollow.following;
      }),
    };
  }),

  // get followers from username
  getFollowersFromUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const follows = await prisma.follows.findMany({
        where: {
          following: {
            username: input.username,
          },
        },
        select: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              bio: true,
              image: true,
              authorVerified: true,
            },
          },
        },
      });

      return {
        follows: follows.map((eachFollow) => {
          return eachFollow.follower;
        }),
      };
    }),

  // get follwings from username
  getFollowingsFromUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const follows = await prisma.follows.findMany({
        where: {
          follower: {
            username: input.username,
          },
        },
        select: {
          following: {
            select: {
              id: true,
              name: true,
              username: true,
              bio: true,
              image: true,
              authorVerified: true,
            },
          },
        },
      });

      return {
        follows: follows.map((eachFollow) => {
          return eachFollow.following;
        }),
      };
    }),
});
