import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const CommentsRouter = createTRPCRouter({
  // get comments for a post
  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        select: {
          id: true,
          _count: {
            select: {
              CommentLikedByAuthor: true,
            },
          },
          commentText: true,
          createdOn: true,
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

  // create comment on a post
  create: protectedProcedure
    .input(z.object({ postId: z.string(), commentText: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const createdComment = await prisma.comment.create({
        data: {
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          commentText: input.commentText,
          post: {
            connect: {
              id: input.postId,
            },
          },
        },
      });

      return createdComment;
    }),
});
