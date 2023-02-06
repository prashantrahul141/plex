import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  ping: PingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
