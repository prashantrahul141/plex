import { prisma } from 'src/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const SettingsRouter = createTRPCRouter({
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    const settings = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        settings: true,
      },
    });

    return settings?.settings;
  }),
  changeOfficialNews: protectedProcedure
    .input(z.object({ target: z.boolean().default(false) }))
    .mutation(async ({ ctx, input }) => {
      const foundSettings = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          settingsId: true,
        },
      });
      if (foundSettings) {
        await prisma.settings.update({
          where: {
            id: foundSettings.settingsId,
          },
          data: {
            officialNews: input.target,
          },
        });
      }
    }),
});
