import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const TrendingRouter = createTRPCRouter({
  ping: protectedProcedure
    .input(
      z.object({
        data: z.string().nullable(),
      })
    )
    .query(({ input }) => {
      return input.data;
    }),
});
