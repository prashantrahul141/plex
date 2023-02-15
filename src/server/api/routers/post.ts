import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { v2 as cloudinary } from 'cloudinary';
import { env } from 'src/env/server.mjs';
import { prisma } from 'src/server/db';

export const PostRouter = createTRPCRouter({
  getSignature: protectedProcedure.input(z.object({})).query(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      env.CLOUDINARY_CLOUDAPISECRET
    );

    return { timestamp: timestamp.toString(), signature };
  }),

  create: protectedProcedure
    .input(
      z.object({
        postText: z.string(),
        postImages: z
          .object({
            public_id: z.string(),
            version_number: z.number(),
            signature: z.string(),
          })
          .nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let public_id: string | null = null;
      if (input.postImages) {
        const expectedSignature = cloudinary.utils.api_sign_request(
          {
            public_id: input.postImages.public_id,
            version: input.postImages.version_number,
          },
          env.CLOUDINARY_CLOUDAPISECRET
        );

        if (input.postImages.signature === expectedSignature) {
          public_id = input.postImages.public_id;
        }
      }

      const createdPost = await prisma.post.create({
        data: {
          text: input.postText,
          image: public_id,
          Author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
        select: {
          id: true,
          Author: {
            select: {
              username: true,
            },
          },
        },
      });

      return { createdPost };
    }),

  view: protectedProcedure.input(z.object({ postId: z.string() })).query(() => {
    return {};
  }),

  list: protectedProcedure
    .input(z.object({ skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: 20,
        skip: input.skip,
        orderBy: { createdOn: 'asc' },
        include: {
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

  listFromUserId: protectedProcedure
    .input(z.object({ userId: z.string(), skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: 20,
        skip: input.skip,
        orderBy: { createdOn: 'asc' },
        where: {
          authorId: input.userId,
        },
        include: {
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

  like: protectedProcedure
    .input(z.object({ postId: z.string(), addLike: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const likedAlready = await prisma.likedByAuthor.findUnique({
        where: {
          postId_userId: { postId: input.postId, userId: ctx.session.user.id },
        },
      });

      if (input.addLike) {
        if (!likedAlready) {
          await prisma.likedByAuthor.create({
            data: {
              post: {
                connect: {
                  id: input.postId,
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          });

          return { status: 'ADDEDLIKE' } as const;
        }
        return { status: 'ALREADYLIKED' } as const;
      } else {
        if (likedAlready) {
          await prisma.likedByAuthor.delete({
            where: {
              postId_userId: {
                postId: input.postId,
                userId: ctx.session.user.id,
              },
            },
          });

          return { status: 'REMOVEDLIKE' } as const;
        }

        return { status: 'ALREADYNOTLIKED' } as const;
      }
    }),

  bookMark: protectedProcedure
    .input(z.object({ postId: z.string(), addBookmark: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const alreadyBookmarked = await prisma.bookmarkedByAuthor.findUnique({
        where: {
          postId_userId: { postId: input.postId, userId: ctx.session.user.id },
        },
      });

      if (input.addBookmark) {
        if (!alreadyBookmarked) {
          await prisma.bookmarkedByAuthor.create({
            data: {
              user: { connect: { id: ctx.session.user.id } },
              post: {
                connect: {
                  id: input.postId,
                },
              },
            },
          });

          return { status: 'ADDEDBOOKMARK' } as const;
        }
        return { status: 'ALREADYBOOKMARKED' } as const;
      } else {
        if (alreadyBookmarked) {
          await prisma.bookmarkedByAuthor.delete({
            where: {
              postId_userId: {
                postId: input.postId,
                userId: ctx.session.user.id,
              },
            },
          });
          return { status: 'REMOVEDBOOKMARK' };
        }
        return { status: 'ALREADYNOTBOOKMARKED' };
      }
    }),
});
