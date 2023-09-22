import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

export interface PostHeaderProps {
  username?: string | null;
  screenName?: string | null;
  datetime: string;
  text: string;
  userId?: string | null;
}

export default function PostHeader({
  username,
  screenName,
  datetime,
  text,
  userId,
}: PostHeaderProps) {
  return (
    <header className='w-full pr-5 whitespace-pre-line'>
      <div className='flex gap-1'>
        <span className='font-bold'>
          <Link href={`/users/${userId}`}>{username}</Link>
        </span>
        <span className='text-gray-500'>
          <Link href={`/users/${userId}`}>@{screenName}</Link>
        </span>
        <span className='leading-4 text-gray-500'>.</span>
        <span className='text-gray-500'>{dayjs(datetime).fromNow(true)}</span>
      </div>
      <p>{text}</p>
    </header>
  );
}
