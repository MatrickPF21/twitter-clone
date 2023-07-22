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

export const postFooterButtons: Omit<PostFooterButtonProps, "value">[] = [
  {
    Icon: <ChatBubbleOvalLeftIcon className="h-5 w-5" />,
    label: "Reply",
  },
  {
    Icon: <RetweetIcon className="h-5 w-5" />,
    label: "Retweet",
  },
  {
    Icon: <HeartIcon className="h-5 w-5" />,
    label: "Like",
  },
  {
    Icon: <ChartBarIcon className="h-5 w-5" />,
    label: "View",
  },
  {
    Icon: <ShareIcon className="h-5 w-5" />,
    label: "Share",
  },
];
const avoidValuesByLabel = ["Share", "More"];

export interface PostFooterProps extends Record<PostFooterLabel, number> {}

export default function PostFooter(props: Partial<PostFooterProps>) {
  return (
    <footer className="flex items-center gap-10">
      {postFooterButtons.map((btn) => {
        let value;

        if (!avoidValuesByLabel.some((v) => v === btn.label)) {
          value = 10;
        }

        value = props[btn.label];

        return <PostFooterButton {...btn} key={btn.label} value={value} />;
      })}
    </footer>
  );
}
