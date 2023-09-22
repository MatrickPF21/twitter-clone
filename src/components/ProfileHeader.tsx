import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Header from "./Header";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export interface ProfileHeaderProps {
  username: string;
  tweetCount: number;
}

export default function ProfileHeader(props: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <Header>
      <div className='flex items-center gap-8 p-2'>
        <div>
          <Button
            size='icon'
            className='bg-transparent p-2 hover:bg-hover'
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className='h-5 w-5 rounded-full' />
          </Button>
        </div>
        <div>
          <div>
            <h1 className='text-xl font-bold'>{props.username}</h1>
          </div>
          <div>
            <span className='text-sm text-gray-500'>
              {props.tweetCount} Tweets
            </span>
          </div>
        </div>
      </div>
    </Header>
  );
}
