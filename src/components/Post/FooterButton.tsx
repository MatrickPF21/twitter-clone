import React from "react";
import { Button } from "../ui/button";

type Label = "comments" | "retweets" | "likes" | "reach" | "share";
type HoverConfig = {
  bg: string;
  text: string;
};

const hoverConfig: Record<Label, HoverConfig> = {
  comments: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  retweets: {
    bg: "[&>button]:hover:bg-[#071a14] [&>button]:active:bg-[#0b2a21]",
    text: "group-hover:text-[#00ba7c]",
  },
  likes: {
    bg: "[&>button]:hover:bg-[#200914] [&>button]:active:bg-[#330f20]",
    text: "group-hover:text-[#f91880]",
  },
  reach: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  share: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
};

export interface PostFooterButtonProps {
  Icon: React.ReactNode;
  label: Label;
  value: number;
}

export default function PostFooterButton({
  Icon,
  label,
  value,
}: PostFooterButtonProps) {
  const { bg, text } = hoverConfig[label];

  return (
    <div className={`group flex items-center gap-2 ${bg}`} role="button">
      <Button
        size="icon"
        className={`group/button flex items-center justify-center bg-transparent p-2 text-gray-500 ${text}`}
      >
        {Icon}
      </Button>
      <span className={`text-xs text-gray-500 ${text}`}>
        {label === "share" ? "" : value}
      </span>
    </div>
  );
}

// this was working
{
  /* <div
      className="group flex items-center gap-2 [&>button]:hover:!bg-[#0a171f]"
      role="button"
    >
      <Button
        size="icon"
        className="group/button flex items-center justify-center bg-transparent p-2 text-gray-500 group-hover:text-primary"
      >
        {Icon}
      </Button>
      <span className="text-xs text-gray-500 group-hover:text-primary">
        {label}
      </span>
    </div> */
}
