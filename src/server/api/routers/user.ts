import { prisma } from 'src/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const UserRouter = createTRPCRouter({
  getFromId: protectedProcedure
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
          followers: {
            where: {
              followerId: ctx.session.user.id,
            },
          },
          authorVerified: true,
          _count: { select: { followers: true, followings: true } },
        },
      });

      return {
        foundUser,
        isAuthor: foundUser ? foundUser.id === ctx.session?.user.id : false,
      };
    }),

  get: protectedProcedure
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
          followers: {
            where: {
              followerId: ctx.session.user.id,
            },
          },
          authorVerified: true,
          _count: { select: { followers: true, followings: true } },
        },
      });

      return {
        foundUser,
        isAuthor: foundUser ? foundUser.id === ctx.session?.user.id : false,
      };
    }),

  follow: protectedProcedure
    .input(z.object({ followId: z.string(), addFollow: z.boolean() }))
    .query(async ({ input, ctx }) => {
      if (input.followId !== ctx.session.user.id) {
        const alreadyFollow = await prisma.follows.findUnique({
          where: {
            followerId_followingId: {
              followerId: ctx.session.user.id,
              followingId: input.followId,
            },
          },
        });
        if (input.addFollow) {
          if (!alreadyFollow) {
            await prisma.follows.create({
              data: {
                follower: {
                  connect: {
                    id: ctx.session.user.id,
                  },
                },
                following: {
                  connect: {
                    id: input.followId,
                  },
                },
              },
            });

            return { status: 'ADDEDFOLLOW' } as const;
          }
          return { status: 'ALREADYFOLLOW' } as const;
        } else {
          if (alreadyFollow) {
            await prisma.follows.delete({
              where: {
                followerId_followingId: {
                  followerId: ctx.session.user.id,
                  followingId: input.followId,
                },
              },
            });
            return { status: 'REMOVEDFOLLOW' } as const;
          }
          return { status: 'ALREADYNOTFOLLOW' } as const;
        }
      }
    }),
});
