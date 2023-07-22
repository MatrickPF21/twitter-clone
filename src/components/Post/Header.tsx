import dayjs from "dayjs";
import React from "react";

export interface PostHeaderProps {
  username?: string | null;
  screenName?: string | null;
  datetime: string;
  text: string;
}

export default function PostHeader({
  username,
  screenName,
  datetime,
  text,
}: PostHeaderProps) {
  return (
    <header className="w-full pr-5">
      <div className="flex gap-1">
        <span className="font-bold">{username}</span>
        <span className="text-gray-500">@{screenName}</span>
        <span className="leading-4 text-gray-500">.</span>
        <span className="text-gray-500">{dayjs(datetime).fromNow(true)}</span>
      </div>
      <p>{text}</p>
    </header>
  );
}
