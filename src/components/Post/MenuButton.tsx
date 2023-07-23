import React from "react";
import { Button } from "../ui/button";
import {
  EllipsisHorizontalIcon,
  FaceFrownIcon,
  UserPlusIcon,
  NoSymbolIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { labelConfig } from "./FooterButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export interface MenuButtonProps {}

export default function MenuButton(props: MenuButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`group absolute right-1 top-1 flex items-center gap-2 rounded-full ${labelConfig.Reply.bg}`}
          role="button"
        >
          <Button
            size="icon"
            className={`group/button flex items-center justify-center bg-transparent p-2 text-gray-500 ${labelConfig.Reply.text}`}
          >
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-lg"
        style={{
          boxShadow:
            "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaceFrownIcon className="mr-2 h-4 w-4" />
            <span className="text-[15px] font-bold">
              Not interested on this tweet
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            <span className="text-[15px] font-bold">Follow matrickpf21</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NoSymbolIcon className="mr-2 h-4 w-4" />
            <span className="text-[15px] font-bold">Block matrickpf21</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FlagIcon className="mr-2 h-4 w-4" />
            <span className="text-[15px] font-bold">Report tweet</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
