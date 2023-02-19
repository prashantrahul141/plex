import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const FollowsRouter = createTRPCRouter({
  ping: publicProcedure
    .input(
      z.object({
        data: z.string().nullable(),
      })
    )
    .query(({ input }) => {
      return input.data;
    }),
});
