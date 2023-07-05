import React from "react";
import Image from "next/image";

import PostFooter from "./Footer";
import PostHeader from "./Header";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { hoverConfig } from "./FooterButton";
import MenuButton from "./MenuButton";

export interface PostProps {}

export default function Post(_: PostProps) {
  return (
    <section className="relative flex min-h-max gap-2 border-b border-gray-700 p-4">
      <MenuButton />
      <div className="flex-none">
        <Image
          className="rounded-full"
          src="/assets/images/user.jpg"
          alt="user image"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-2">
        <PostHeader />
        <div className="relative mb-1 max-h-[500px] pr-20">
          <Image
            src="/assets/images/post_image.jpg"
            alt="post image"
            fill={true}
            className="!relative !w-auto rounded-3xl border border-gray-700"
          />
        </div>
        <PostFooter />
      </div>
    </section>
  );
}
