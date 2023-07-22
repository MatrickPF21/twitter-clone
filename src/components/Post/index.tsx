import React from "react";
import Image from "next/image";

import PostFooter from "./Footer";
import PostHeader from "./Header";
import MenuButton from "./MenuButton";

export interface PostProps {
  authorName?: string | null;
  authorScreenName?: string | null;
  datetime: string;
  text: string;
  likes: number;
  image?: string;
  likedByMe: boolean;
  postId: string;
}

export default function Post(props: PostProps) {
  return (
    <section className='relative flex min-h-max gap-2 border-b border-gray-700 p-4'>
      <MenuButton />
      <div className='flex-none'>
        <Image
          className='rounded-full'
          src='/assets/images/user.jpg'
          alt='user image'
          width={40}
          height={40}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <PostHeader
          datetime={props.datetime}
          screenName={props.authorScreenName}
          text={props.text}
          username={props.authorName}
        />
        {props.image && (
          <div className='relative mb-1 max-h-[500px] pr-20'>
            <Image
              src={props.image}
              alt='post image'
              fill={true}
              className='!relative !w-auto rounded-3xl border border-gray-700'
            />
          </div>
        )}
        <PostFooter
          Like={props.likes}
          isLiked={props.likedByMe}
          postId={props.postId}
        />
      </div>
    </section>
  );
}
