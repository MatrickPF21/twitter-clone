import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import RetweetIcon from "../icons/Retweet";
import { api } from "~/utils/api";
import TooltipButton from "../ui/TooltipButton";

export interface PostFooterProps {
  isLiked: boolean;
  postId: string;
  likeCount?: number;
  replyCount?: number;
  retweetCount?: number;
  viewCount?: number;
}

export default function PostFooter({
  isLiked,
  postId,
  likeCount = 0,
  replyCount = 0,
  retweetCount = 0,
  viewCount = 0,
}: PostFooterProps) {
  const apiUtils = api.useContext();

  const { mutate: handleLike } = api.tweet.toggleLike.useMutation({
    onSuccess: data => {
      apiUtils.tweet.list.setData(undefined, prevTweet =>
        prevTweet?.map(tweet => {
          if (tweet.id !== postId) return tweet;

          return {
            ...tweet,
            likedByMe: data.didLike,
            likesCounter: data.count,
          };
        })
      );
    },
    onMutate: postId => {
      apiUtils.tweet.list.setData(undefined, prevTweet =>
        prevTweet?.map(tweet => {
          if (tweet.id !== postId) return tweet;

          return {
            ...tweet,
            likedByMe: !isLiked,
            likesCounter: isLiked
              ? tweet.likesCounter - 1
              : tweet.likesCounter + 1,
          };
        })
      );
    },
  });

  return (
    <footer className='flex items-center justify-between w-full'>
      <TooltipButton
        label='Reply'
        className='hover:bg-[#0a171f] hover:text-primary active:bg-[#0d1e28]'
      >
        <ChatBubbleOvalLeftIcon className='h-5 w-5' />
        {replyCount !== undefined && (
          <span className='text-xs font-normal'>{replyCount}</span>
        )}
      </TooltipButton>
      <TooltipButton
        label='Retweet'
        className='hover:bg-[#071a14] hover:text-[#00ba7c] active:bg-[#0b2a21]'
      >
        <RetweetIcon className='h-5 w-5' />
        {retweetCount !== undefined && (
          <span className='text-xs font-normal'>{retweetCount}</span>
        )}
      </TooltipButton>
      <TooltipButton
        label='Like'
        className='hover:bg-[#200914] hover:text-[#f91880] active:bg-[#330f20]'
        onClick={() => handleLike(postId)}
      >
        <HeartIcon className='h-5 w-5' />
        {likeCount !== undefined && (
          <span className='text-xs font-normal'>{likeCount}</span>
        )}
      </TooltipButton>
      <TooltipButton
        label='View'
        className='hover:bg-[#0a171f] hover:text-primary active:bg-[#0d1e28]'
      >
        <ChartBarIcon className='h-5 w-5' />
        {viewCount !== undefined && (
          <span className='text-xs font-normal'>{viewCount}</span>
        )}
      </TooltipButton>
      <TooltipButton
        label='Share'
        className='hover:bg-[#0a171f] hover:text-primary active:bg-[#0d1e28]'
      >
        <ShareIcon className='h-5 w-5' />
      </TooltipButton>
    </footer>
  );
}
