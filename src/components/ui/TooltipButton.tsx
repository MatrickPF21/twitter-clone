import React from "react";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "~/utils";

interface TooltipButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  label: string;
  className?: string;
}

const TooltipButton = React.forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ label, className, children, ...props }, ref) => {

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              className={cn(
                `group inline-flex items-center justify-center gap-2 bg-transparent p-2 text-gray-500`,
                className
              )}
              ref={ref}
              {...props}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-xs'>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipButton.displayName = "TooltipButton";

export default TooltipButton;
