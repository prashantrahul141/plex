import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';
import { POSTS_PER_PAGE } from 'src/constantValues';

export const TrendingRouter = createTRPCRouter({
  // gets current trending page
  getCurrentTrending: protectedProcedure
    .input(z.object({ take: z.number().positive().default(10) }))
    .query(async ({ input }) => {
      const hashtagsTrending = await prisma.hashtagOnPost.groupBy({
        by: ['createdOn', 'hashtagId'],
        orderBy: { createdOn: 'asc' },
        where: {
          createdOn: {
            gte: (() => {
              const today = new Date();
              const oneWeekBefore = today.getDate() - 7;
              today.setDate(oneWeekBefore);
              return today.toISOString();
            })(),
          },
        },
      });

      const idsToFind = hashtagsTrending.map((e) => e.hashtagId);
      const hashtagsTrendingData = await prisma.hashtag.findMany({
        where: {
          id: { in: idsToFind },
        },
        take: input.take,
        include: {
          _count: {
            select: {
              HashtagOnPost: true,
            },
          },
        },
      });
      return hashtagsTrendingData;
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
