import { prisma } from 'src/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { v2 as cloudinary } from 'cloudinary';
import { env } from 'src/env/server.mjs';
import { defaultAvatarURLs, defaultBannerURLs } from 'src/constantValues';

export const UserRouter = createTRPCRouter({
  getForShowFromId: protectedProcedure
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

  getForShow: protectedProcedure
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

  // checks if a username exists or not.
  checkUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const foundUser = await prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: { id: true },
      });

      return foundUser ? true : false;
    }),

  getForEdit: protectedProcedure.query(async ({ ctx }) => {
    const UserData = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        name: true,
        username: true,
        image: true,
        url: true,
        banner: true,
        bio: true,
      },
    });

    if (UserData) {
      return UserData;
    }
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

  // Edit profile
  editUserInfo: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        url: z.string().nullable(),
        bio: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
          username: input.username,
          url: input.url,
          bio: input.bio,
        },
      });

      return { status: 'UPDATEDPROFILE' } as const;
    }),

  // edit user profile picture
  editProfilePicture: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        public_id: z.string(),
        version_number: z.number(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const expectedSignature = cloudinary.utils.api_sign_request(
        {
          public_id: input.public_id,
          version: input.version_number,
        },
        env.CLOUDINARY_CLOUDAPISECRET
      );
      if (expectedSignature === input.signature) {
        const oldAvatarPicture = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            image: true,
          },
        });

        if (oldAvatarPicture) {
          const oldURL = new URL(oldAvatarPicture.image);

          if (oldURL.host === 'res.cloudinary.com') {
            const oldUrlPublicId = oldURL.pathname
              .split('/')
              [oldURL.pathname.split('/').length - 1]?.split('.')[0];

            if (
              oldUrlPublicId &&
              !defaultAvatarURLs.includes(oldURL.toString())
            ) {
              await cloudinary.uploader.destroy(oldUrlPublicId, {
                // @ts-ignore
                api_key: env.CLOUDINARY_CLUODAPIKEY,
                api_secret: env.CLOUDINARY_CLOUDAPISECRET,
                cloud_name: env.CLOUDINARY_CLOUDNAME,
              });
            }
          }
        }

        await prisma.user.update({
          data: {
            image: input.url,
          },
          where: {
            id: ctx.session.user.id,
          },
        });

        return { status: 'UPDATEDPROFILEPICTURE' } as const;
      }
      return { status: 'FAILED' } as const;
    }),

  // edit user profile banner
  editBannerPicture: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        public_id: z.string(),
        version_number: z.number(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const expectedSignature = cloudinary.utils.api_sign_request(
        {
          public_id: input.public_id,
          version: input.version_number,
        },
        env.CLOUDINARY_CLOUDAPISECRET
      );
      if (expectedSignature === input.signature) {
        const oldBannerPicture = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            banner: true,
          },
        });

        if (oldBannerPicture) {
          const oldURL = new URL(oldBannerPicture.banner);

          if (oldURL.host === 'res.cloudinary.com') {
            const oldUrlPublicId = oldURL.pathname
              .split('/')
              [oldURL.pathname.split('/').length - 1]?.split('.')[0];
            if (
              oldUrlPublicId &&
              !defaultBannerURLs.includes(oldURL.toString())
            ) {
              await cloudinary.uploader.destroy(oldUrlPublicId, {
                // @ts-ignore
                api_key: env.CLOUDINARY_CLUODAPIKEY,
                api_secret: env.CLOUDINARY_CLOUDAPISECRET,
                cloud_name: env.CLOUDINARY_CLOUDNAME,
              });
            }
          }
        }

        await prisma.user.update({
          data: {
            banner: input.url,
          },
          where: {
            id: ctx.session.user.id,
          },
        });
        return { status: 'UPDATEDBANNERPICTURE' } as const;
      }
      return { status: 'FAILED' } as const;
    }),
});
