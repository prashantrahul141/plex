import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const CommentsRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
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

      const currentUser = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          image: true,
        },
      });

      return {
        comments,
        currenUserImage: currentUser
          ? currentUser.image
          : 'https://res.cloudinary.com/dwa8at7sx/image/upload/defaultavatar_ve03ed',
      };
    }),
});
