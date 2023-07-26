import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Header from "./Header";
import { Button } from "./ui/button";

export interface ProfileHeaderProps {}

export default function ProfileHeader(_: ProfileHeaderProps) {
  return (
    <Header>
      <div className='flex items-center gap-8 p-2'>
        <div>
          <Button size='icon' className='bg-transparent p-2 hover:bg-hover'>
            <ArrowLeftIcon className='h-5 w-5 rounded-full' />
          </Button>
        </div>
        <div>
          <div>
            <h1 className='text-xl font-bold'>Username</h1>
          </div>
          <div>
            <span className='text-sm text-gray-500'>14.4k Tweets</span>
          </div>
        </div>
      </div>
    </Header>
  );
}
