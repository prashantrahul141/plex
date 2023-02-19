import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const CommentsRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        select: {
          id: true,
          commentText: true,
          author: {
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

      return comments;
    }),
});
