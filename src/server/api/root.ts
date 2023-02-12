import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';
import { PostRouter } from './routers/post';
import { UserRouter } from './routers/user';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
  post: PostRouter,
  user: UserRouter,
});

export type AppRouter = typeof appRouter;
