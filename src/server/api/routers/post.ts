import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { v2 as cloudinary } from 'cloudinary';
import { env } from 'src/env/server.mjs';
import { prisma } from 'src/server/db';
import {
  HASHTAG_REGEX_EXP,
  POSTS_PER_PAGE,
  USERNAME_REGEX_EXP,
} from 'src/constantValues';
import reactStringReplace from 'react-string-replace';
import type { IReturnHashTagOnPost } from 'src/types';

export const PostRouter = createTRPCRouter({
  // gets image signature for client to upload
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

  // creates new post
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
      let postImageLink: string | null = null;
      if (input.postImages) {
        const expectedSignature = cloudinary.utils.api_sign_request(
          {
            public_id: input.postImages.public_id,
            version: input.postImages.version_number,
          },
          env.CLOUDINARY_CLOUDAPISECRET
        );

        if (input.postImages.signature === expectedSignature) {
          postImageLink = `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/${input.postImages.public_id}`;
        }
      }

      const alreadyAddedHashtags: Array<string> = [];
      const hashtagsOnPost: IReturnHashTagOnPost = [];

      reactStringReplace(input.postText, HASHTAG_REGEX_EXP, (match) => {
        if (!alreadyAddedHashtags.includes(match)) {
          alreadyAddedHashtags.push(match);
          hashtagsOnPost.push({
            Hashtag: {
              connectOrCreate: {
                where: { text: match },
                create: { text: match },
              },
            },
          });
        }
        return '';
      });

      const createdPost = await prisma.post.create({
        data: {
          text: input.postText,
          image: postImageLink,
          Author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          HashtagOnPost: {
            create: hashtagsOnPost,
          },
        },
        select: {
          id: true,
          Author: {
            select: {
              username: true,
              name: true,
              image: true,
            },
          },
        },
      });

      const mentionsOnPost: Array<string> = [];

      reactStringReplace(input.postText, USERNAME_REGEX_EXP, (match) => {
        if (
          match !== 'everyone' &&
          match !== `${createdPost.Author.username}`
        ) {
          if (!mentionsOnPost.includes(match)) {
            mentionsOnPost.push(match);
          }
        }
        return '';
      });

      const usersMentioned = await prisma.user.findMany({
        where: {
          username: { in: mentionsOnPost },
        },
        select: {
          id: true,
        },
      });

      await prisma.notification.createMany({
        data: usersMentioned.map((each) => {
          return {
            userId: each.id,
            iconImage: createdPost.Author.image,
            text: `${createdPost.Author.name} mentioned you on their post.`,
            url: `${createdPost.Author.username}/${createdPost.id}`,
          };
        }),
      });

      // notifying everyone who has their notification open when posted by plex account.
      if (createdPost.Author.username === 'plex') {
        const usersWithNoticationEnabled = await prisma.user.findMany({
          where: {
            settings: {
              officialNews: {
                equals: true,
              },
            },
          },
          select: {
            id: true,
          },
        });
        await prisma.notification.createMany({
          data: usersWithNoticationEnabled.map((e) => {
            return {
              userId: e.id,
              text: 'New official announcement by Plex.',
              iconImage: '/favicon.ico',
              url: `${createdPost.Author.username}/${createdPost.id}`,
            };
          }),
        });
      }

      return { createdPost };
    }),

  // delete a specific post
  delete: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const postToDelete = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });

      if (postToDelete) {
        if (postToDelete.authorId === ctx.session.user.id) {
          await prisma.post.delete({
            where: {
              id: input.postId,
            },
          });

          // deleting image from cloudinary
          if (postToDelete.image) {
            const imageUrl = new URL(postToDelete.image);
            const imagePublicId = imageUrl.pathname
              .split('/')
              [imageUrl.pathname.split('/').length - 1]?.split('.')[0];

            if (imagePublicId) {
              await cloudinary.uploader.destroy(imagePublicId, {
                // @ts-ignore
                api_key: env.CLOUDINARY_CLUODAPIKEY,
                api_secret: env.CLOUDINARY_CLOUDAPISECRET,
                cloud_name: env.CLOUDINARY_CLOUDNAME,
              });
            }
          }
          return { status: 'POSTDELETED' } as const;
        }
        return { status: 'UNAUTHORIZED' } as const;
      }

      return { status: 'POSTDOESNTEXIST' } as const;
    }),

  // view a specific post
  view: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
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

  // list posts for home page
  list: protectedProcedure
    .input(z.object({ skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: input.skip,
        orderBy: { createdOn: 'desc' },
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

  // list post from a specific userid
  listFromUserId: protectedProcedure
    .input(z.object({ userId: z.string(), skip: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const posts = await prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: input.skip,
        orderBy: { createdOn: 'desc' },
        where: {
          authorId: input.userId,
        },
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

  // like a post
  like: protectedProcedure
    .input(z.object({ postId: z.string(), addLike: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
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

  // bookmark a post
  bookMark: protectedProcedure
    .input(z.object({ postId: z.string(), addBookmark: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
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

  // get user bookmarks
  getBookmarks: protectedProcedure.query(async ({ ctx }) => {
    const bookmarkedPosts = await prisma.bookmarkedByAuthor.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        post: {
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
        },
      },
    });

    return bookmarkedPosts;
  }),
});
