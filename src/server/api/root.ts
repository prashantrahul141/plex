import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';
import { PostRouter } from './routers/post';
import { UserRouter } from './routers/user';
import { NotificationRouter } from './routers/notification';
import { FollowsRouter } from './routers/follows';
import { CommentsRouter } from './routers/comments';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
  post: PostRouter,
  user: UserRouter,
  notification: NotificationRouter,
  follows: FollowsRouter,
  comments: CommentsRouter,
});

export type AppRouter = typeof appRouter;
