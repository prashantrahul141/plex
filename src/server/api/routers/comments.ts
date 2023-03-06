import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';
import reactStringReplace from 'react-string-replace';
import { USERNAME_REGEX_EXP } from 'src/constantValues';

export const CommentsRouter = createTRPCRouter({
  // get comments for a post
  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        orderBy: { CommentLikedByAuthor: { _count: 'desc' } },
        select: {
          id: true,
          _count: {
            select: {
              CommentLikedByAuthor: true,
            },
          },
          CommentLikedByAuthor: {
            where: {
              userId: ctx.session.user.id,
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
    .input(
      z.object({
        postAuthor: z.object({ id: z.string(), username: z.string() }),
        postId: z.string(),
        commentText: z.string(),
      })
    )
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
        select: {
          id: true,
          _count: {
            select: {
              CommentLikedByAuthor: true,
            },
          },
          CommentLikedByAuthor: {
            where: {
              userId: ctx.session.user.id,
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

      const mentionsOnComment: Array<string> = [];

      reactStringReplace(input.commentText, USERNAME_REGEX_EXP, (match) => {
        if (
          !mentionsOnComment.includes(match) &&
          match !== createdComment.author.username
        ) {
          mentionsOnComment.push(match);
        }

        return '';
      });

      const usersMentioned = await prisma.user.findMany({
        where: {
          username: { in: mentionsOnComment },
        },
        select: {
          id: true,
        },
      });

      await prisma.notification.createMany({
        data: usersMentioned.map((each) => {
          return {
            userId: each.id,
            iconImage: createdComment.author.image,
            text: `${createdComment.author.name} mentioned you on their comment.`,
            url: `${input.postAuthor.username}/${input.postId}`,
          };
        }),
      });

      if (input.postAuthor.id !== ctx.session.user.id) {
        await prisma.notification.create({
          data: {
            url: `/${input.postAuthor.username}/${input.postId}`,
            iconImage: createdComment.author.image,
            text: `${createdComment.author.name} commented on your post.`,
            User: {
              connect: {
                id: input.postAuthor.id,
              },
            },
          },
        });
      }

      return createdComment;
    }),

  // like a commente
  like: protectedProcedure
    .input(z.object({ commentId: z.string(), addLike: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const likedAlready = await prisma.commentLikedByAuthor.findUnique({
        where: {
          commentId_userId: {
            commentId: input.commentId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (input.addLike) {
        if (!likedAlready) {
          await prisma.commentLikedByAuthor.create({
            data: {
              user: { connect: { id: ctx.session.user.id } },
              comment: {
                connect: {
                  id: input.commentId,
                },
              },
            },
          });
          return { status: 'ADDEDLIKE' } as const;
        }
        return { status: 'ALREADYLIKED' } as const;
      } else {
        if (likedAlready) {
          await prisma.commentLikedByAuthor.delete({
            where: {
              commentId_userId: {
                commentId: input.commentId,
                userId: ctx.session.user.id,
              },
            },
          });
          return { status: 'REMOVEDLIKE' } as const;
        }

        return { status: 'ALREADYNOTLIKED' } as const;
      }
    }),
});
