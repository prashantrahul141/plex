import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const NotificationRouter = createTRPCRouter({
  // get all notifications
  get: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
    });

    return notifications;
  }),

  // create a new notification
  create: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        iconImage: z.string().nullable(),
        url: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.notification.create({
        data: {
          text: input.text,
          iconImage: input.iconImage || '/favicon.ico',
          url: input.url || '/profile',

          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
