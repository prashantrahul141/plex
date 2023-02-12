import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
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
      z.object({ postText: z.string(), postImages: z.string().nullable() })
    )
    .mutation(async ({ input, ctx }) => {
      const createdPost = await prisma.post.create({
        data: {
          text: input.postText,
          image: input.postImages,
          Author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return { createdPostId: createdPost.id };
    }),

  view: publicProcedure.input(z.object({ postId: z.string() })).query(() => {
    return {};
  }),
});
