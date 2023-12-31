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
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export interface AccountMenuProps {}

export default function AccountMenu(props: AccountMenuProps) {
  const session = useSession();

  const { data: profile, isLoading } = api.profile.baseById.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      id: session.data?.user?.id!,
    },
    { enabled: !!session.data?.user.id }
  );

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-full p-4 transition-colors hover:bg-hover focus-within:hover:!bg-hover"
          role="button"
          tabIndex={0}
        >
          {!isLoading ? (
            <>
              <div>
                <Image
                  src={profile?.image ?? "/assets/images/user.jpg"}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-white">{profile?.name}</span>
                <span className="text-gray-500">@{profile?.screenName}</span>
              </div>
              <div className="ml-auto">
                <EllipsisHorizontalIcon className="h5 w-5 text-white" />
              </div>
            </>
          ) : (
            <span>Loading...</span>
          )}
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
            <span className="text-[15px] font-bold">
              Log out @{profile?.screenName}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
