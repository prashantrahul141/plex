import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';
import { PostRouter } from './routers/post';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
  post: PostRouter,
});

export type AppRouter = typeof appRouter;
