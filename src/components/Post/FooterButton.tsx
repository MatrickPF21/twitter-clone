import React from "react";
import { Button } from "../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { twMerge } from "tailwind-merge";

export type PostFooterLabel =
  | "Reply"
  | "Retweet"
  | "Like"
  | "View"
  | "Share"
  | "More";
type HoverConfig = {
  bg: string;
  text: string;
};

export const hoverConfig: Record<PostFooterLabel, HoverConfig> = {
  Reply: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  Retweet: {
    bg: "[&>button]:hover:bg-[#071a14] [&>button]:active:bg-[#0b2a21]",
    text: "group-hover:text-[#00ba7c]",
  },
  Like: {
    bg: "[&>button]:hover:bg-[#200914] [&>button]:active:bg-[#330f20]",
    text: "group-hover:text-[#f91880]",
  },
  View: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  Share: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  More: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
};

export interface PostFooterButtonProps {
  Icon: React.ReactNode;
  label: PostFooterLabel;
  value?: number;
  className?: string;
}

const PostFooterButton = React.forwardRef<
  HTMLButtonElement,
  PostFooterButtonProps
>(({ Icon, label, value, className }, ref) => {
  const { bg, text } =
    label in hoverConfig
      ? hoverConfig[label as keyof object]
      : hoverConfig.Reply;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={twMerge(
              `group flex items-center gap-2 ${bg}`,
              className
            )}
            role="button"
          >
            <Button
              size="icon"
              className={`group/button flex items-center justify-center bg-transparent p-2 text-gray-500 ${text}`}
              ref={ref}
            >
              {Icon}
            </Button>
            <span className={`text-xs text-gray-500 ${text}`}>{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

PostFooterButton.displayName = "PostFooterButton";

export default PostFooterButton;
