import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';
import { POSTS_PER_PAGE } from 'src/constantValues';

export const TrendingRouter = createTRPCRouter({
  // gets current trending page
  getCurrentTrending: protectedProcedure
    .input(z.object({ skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: input.skip,
        orderBy: { createdOn: 'asc' },
        include: {
          BookmarkedByAuthor: {
            where: {
              userId: ctx.session.user.id,
            },
          },
          LikedByAuthor: {
            where: {
              userId: ctx.session.user.id,
            },
          },
          _count: {
            select: {
              Comments: true,
              LikedByAuthor: true,
            },
          },
          Author: {
            select: {
              id: true,
              image: true,
              name: true,
              username: true,
              authorVerified: true,
            },
          },
        },
      });
      return { posts };
    }),

  // gets posts with a specific hashtag
  getSpecificFromQuery: protectedProcedure
    .input(z.object({ query: z.string(), skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: input.skip,
        include: {
          BookmarkedByAuthor: {
            where: {
              userId: ctx.session.user.id,
            },
          },
          LikedByAuthor: {
            where: {
              userId: ctx.session.user.id,
            },
          },
          _count: {
            select: {
              Comments: true,
              LikedByAuthor: true,
            },
          },
          Author: {
            select: {
              id: true,
              image: true,
              name: true,
              username: true,
              authorVerified: true,
            },
          },
        },
        where: {
          HashtagOnPost: {
            some: {
              Hashtag: {
                text: {
                  equals: input.query,
                },
              },
            },
          },
        },
      });

      return { posts };
    }),
});
