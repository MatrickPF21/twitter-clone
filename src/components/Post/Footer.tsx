import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import RetweetIcon from "../icons/Retweet";
import type { PostFooterButtonProps } from "./FooterButton";
import PostFooterButton from "./FooterButton";

export const postFooterButtons: Omit<PostFooterButtonProps, "value">[] = [
  {
    Icon: <ChatBubbleOvalLeftIcon className="h-5 w-5" />,
    label: "comments",
  },
  {
    Icon: <RetweetIcon className="h-5 w-5" />,
    label: "retweets",
  },
  {
    Icon: <HeartIcon className="h-5 w-5" />,
    label: "likes",
  },
  {
    Icon: <ChartBarIcon className="h-5 w-5" />,
    label: "reach",
  },
  {
    Icon: <ShareIcon className="h-5 w-5" />,
    label: "share",
  },
];

export interface PostFooterProps {}

export default function PostFooter(_: PostFooterProps) {
  return (
    <footer className="flex items-center gap-10">
      {postFooterButtons.map((btn) => {
        return <PostFooterButton {...btn} key={btn.label} value={0} />;
      })}
    </footer>
  );
}
