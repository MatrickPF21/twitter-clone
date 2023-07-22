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
type LabelConfig = {
  bg: string;
  text: string;
  active?: string;
};

export const labelConfig: Record<PostFooterLabel, LabelConfig> = {
  Reply: {
    bg: "[&>button]:hover:bg-[#0a171f] [&>button]:active:bg-[#0d1e28]",
    text: "group-hover:text-primary",
  },
  Retweet: {
    bg: "[&>button]:hover:bg-[#071a14] [&>button]:active:bg-[#0b2a21]",
    text: "group-hover:text-[#00ba7c]",
    active: "!text-[#00ba7c] [&>svg]:fill-[#00ba7c]",
  },
  Like: {
    bg: "[&>button]:hover:bg-[#200914] [&>button]:active:bg-[#330f20]",
    text: "group-hover:text-[#f91880]",
    active: "!text-[#f91880] [&>svg]:fill-[#f91880]",
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

export interface PostFooterButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  Icon: React.ReactNode;
  label: PostFooterLabel;
  value?: number;
  className?: string;
  isActive?: boolean;
}

const PostFooterButton = React.forwardRef<
  HTMLButtonElement,
  PostFooterButtonProps
>(({ Icon, label, value, className, isActive, ...props }, ref) => {
  const { bg, text, active } =
    label in labelConfig
      ? labelConfig[label as keyof object]
      : labelConfig.Reply;

  const activeClassName = isActive ? active || "" : "";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={twMerge(
              `group flex items-center gap-2 ${bg}`,
              className
            )}
            role='button'
          >
            <Button
              size='icon'
              className={`group/button flex items-center justify-center bg-transparent p-2 text-gray-500 ${text} ${activeClassName}`}
              ref={ref}
              {...props}
            >
              {Icon}
            </Button>
            <span
              className={`text-xs text-gray-500 ${text} ${activeClassName}`}
            >
              {value}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

PostFooterButton.displayName = "PostFooterButton";

export default PostFooterButton;
