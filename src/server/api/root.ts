import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
});

export type AppRouter = typeof appRouter;
