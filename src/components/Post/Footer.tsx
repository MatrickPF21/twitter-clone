import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import RetweetIcon from "../icons/Retweet";
import type { PostFooterButtonProps, PostFooterLabel } from "./FooterButton";
import PostFooterButton from "./FooterButton";
import { api } from "~/utils/api";

export const postFooterButtons: Omit<PostFooterButtonProps, "value">[] = [
  {
    Icon: <ChatBubbleOvalLeftIcon className='h-5 w-5' />,
    label: "Reply",
  },
  {
    Icon: <RetweetIcon className='h-5 w-5' />,
    label: "Retweet",
  },
  {
    Icon: <HeartIcon className='h-5 w-5' />,
    label: "Like",
  },
  {
    Icon: <ChartBarIcon className='h-5 w-5' />,
    label: "View",
  },
  {
    Icon: <ShareIcon className='h-5 w-5' />,
    label: "Share",
  },
];
const avoidValuesByLabel = ["Share", "More"];

export interface PostFooterProps
  extends Partial<Record<PostFooterLabel, number>> {
  isLiked: boolean;
  postId: string;
}

export default function PostFooter(props: PostFooterProps) {
  const apiUtils = api.useContext();

  const { mutate: handleLike } = api.tweet.toggleLike.useMutation({
    onSuccess: data => {
      apiUtils.tweet.list.setData(undefined, prevTweet =>
        prevTweet?.map(tweet => {
          if (tweet.id !== props.postId) return tweet;

          return {
            ...tweet,
            likedByMe: data.didLike,
            likesCounter: data.count,
          };
        })
      );
    },
  });

  return (
    <footer className='flex items-center gap-10'>
      {postFooterButtons.map(btn => {
        let value;
        let isActive;
        let onClick;

        if (!avoidValuesByLabel.some(v => v === btn.label)) {
          value = 10;
        }

        if (btn.label === "Like") {
          isActive = props.isLiked;
          onClick = () => handleLike(props.postId);
        }

        value = props[btn.label];

        return (
          <PostFooterButton
            {...btn}
            key={btn.label}
            value={value}
            isActive={isActive}
            onClick={onClick}
          />
        );
      })}
    </footer>
  );
}
