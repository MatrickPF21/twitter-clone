import React from "react";

export interface PostHeaderProps {}

export default function PostHeader(_: PostHeaderProps) {
  return (
    <header className="w-full pr-5">
      <div className="flex gap-1">
        <span className="font-bold">MatrickPF21</span>
        <span className="text-gray-500">@matrickpf21</span>
        <span className="leading-4 text-gray-500">.</span>
        <span className="text-gray-500">20m</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt doloremque
        asperiores deleniti ad qui optio soluta molestiae rerum nam id eaque
        deserunt sit aliquid consequuntur expedita laudantium possimus, at
        tempora.
      </p>
    </header>
  );
}
