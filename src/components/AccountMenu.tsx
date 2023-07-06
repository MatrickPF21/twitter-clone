import React from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export interface AccountMenuProps {}

export default function AccountMenu(props: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-full p-4 transition-colors hover:bg-hover focus-within:hover:!bg-hover"
          role="button"
          tabIndex={0}
        >
          <div>
            <Image
              src="/assets/images/user.jpg"
              alt="user image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-white">MatrickPF21</span>
            <span className="text-gray-500">@matrickpf21</span>
          </div>
          <div className="ml-auto">
            <EllipsisHorizontalIcon className="h5 w-5 text-white" />
          </div>
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
            <span className="text-[15px] font-bold">
              Add an existing account
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/auth",
              })
            }
          >
            <span className="text-[15px] font-bold">Log out @MatrickPF21</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
