import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';
import { PostRouter } from './routers/post';
import { UserRouter } from './routers/user';
import { NotificationRouter } from './routers/notification';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
  post: PostRouter,
  user: UserRouter,
  notification: NotificationRouter,
});

export type AppRouter = typeof appRouter;
