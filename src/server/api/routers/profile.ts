import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  baseById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          screenName: true,
          verified: true,
          name: true,
          image: true,
        },
      });

      if (!user)
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });

      return user;
    }),
  extendedById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const userId = input;

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        select: {
          tweets: {
            orderBy: [
              {
                createadAt: "desc",
              },
            ],
            take: 10,
          },
        },
      });

      if (!user)
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });

      return user;
    }),
});
