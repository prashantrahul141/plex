import { createTRPCRouter } from './trpc';
import { PingRouter } from './routers/ping';
import { PostRouter } from './routers/post';
import { UserRouter } from './routers/user';
import { NotificationRouter } from './routers/notification';
import { FollowsRouter } from './routers/follows';
import { CommentsRouter } from './routers/comments';
import { TrendingRouter } from './routers/trending';
import { AdditionalWidgetRouter } from './routers/additionalWidgets';
import { SettingsRouter } from './routers/settings';

export const appRouter = createTRPCRouter({
  ping: PingRouter,
  post: PostRouter,
  user: UserRouter,
  notification: NotificationRouter,
  follows: FollowsRouter,
  comments: CommentsRouter,
  trending: TrendingRouter,
  additionalWidgets: AdditionalWidgetRouter,
  settings: SettingsRouter,
});

export type AppRouter = typeof appRouter;
