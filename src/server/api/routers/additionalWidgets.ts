import { prisma } from 'src/server/db';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const AdditionalWidgetRouter = createTRPCRouter({
  peopleToFollow: protectedProcedure.query(async ({ ctx }) => {
    const users = await prisma.user.findMany({
      take: 3,
      where: {
        authorVerified: true,
        AND: {
          NOT: {
            id: ctx.session.user.id,
          },
        },
      },
      orderBy: {
        followers: {
          _count: 'desc',
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        authorVerified: true,
        bio: true,
      },
    });

    return users;
  }),
});
