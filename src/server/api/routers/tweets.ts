import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    const tweets = await ctx.prisma.tweet.findMany({
      include: {
        user: true,
        likes: !userId
          ? false
          : {
              where: {
                userId,
              },
            },
      },
      orderBy: [
        {
          createadAt: "desc",
        },
      ],
    });

    return tweets.map(tweet => ({
      ...tweet,
      likedByMe: tweet.likes?.length > 0,
    }));
  }),
  create: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return await ctx.prisma.tweet.create({
        data: {
          text: input.text,
          likesCounter: 0,
          userId,
        },
      });
    }),
  toggleLike: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const tweetId = input;

      const likeExists = await ctx.prisma.like.findUnique({
        where: {
          tweetId_userId: {
            tweetId,
            userId,
          },
        },
      });

      if (!likeExists) {
        await ctx.prisma.like.create({
          data: {
            tweetId,
            userId,
          },
        });

        const newTweet = await ctx.prisma.tweet.update({
          where: {
            id: tweetId,
          },
          data: {
            likesCounter: {
              increment: 1,
            },
          },
        });

        return {
          didLike: true,
          count: newTweet.likesCounter,
        };
      }

      await ctx.prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId,
            userId,
          },
        },
      });

      const newTweet = await ctx.prisma.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          likesCounter: {
            decrement: 1,
          },
        },
      });

      return {
        didLike: false,
        count: newTweet.likesCounter,
      };
    }),
  delete: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const tweetId = input.tweetId;

      const tweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });

      if (!tweet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tweet not found",
        });
      }

      if (tweet.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can't delete this tweet",
        });
      }

      await ctx.prisma.tweet.delete({
        where: {
          id: tweetId,
        },
      });

      return tweetId;
    }),
});
