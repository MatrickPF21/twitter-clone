import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const tweetsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      include: {
        user: true,
      },
    });

    return tweets;
  }),
});
