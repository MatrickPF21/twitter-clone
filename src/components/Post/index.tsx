import React from "react";
import Image from "next/image";
import Link from "next/link";

import PostFooter from "./Footer";
import PostHeader from "./Header";
import MenuButton from "./MenuButton";
import { useSession } from "next-auth/react";

export interface PostProps {
  authorName?: string | null;
  authorScreenName?: string | null;
  authorImage?: string | null;
  authorId?: string | null;
  datetime: string;
  text: string;
  likes: number;
  image?: string;
  likedByMe: boolean;
  postId: string;
}

export default function Post({
  authorName,
  authorScreenName,
  authorImage,
  authorId,
  datetime,
  text,
  likes,
  image,
  likedByMe,
  postId,
}: PostProps) {
  const { data } = useSession();

  return (
    <section className='relative flex min-h-max gap-2 border-b border-gray-700 p-4'>
      <MenuButton postId={postId} canDelete={data?.user.id === authorId} />
      <div>
        <Link className='flex-none' href={`/users/${authorId}`}>
          <Image
            className='rounded-full'
            src={authorImage || "/assets/images/user.jpg"}
            alt='user image'
            width={40}
            height={40}
          />
        </Link>
      </div>
      <article className='flex w-full flex-col gap-2'>
        <PostHeader
          datetime={datetime}
          screenName={authorScreenName}
          text={text}
          username={authorName}
          userId={authorId}
        />
        {image && (
          <div className='relative mb-1 max-h-[500px] pr-20'>
            <Image
              src={image}
              alt='post image'
              fill={true}
              className='!relative !w-auto rounded-3xl border border-gray-700'
            />
          </div>
        )}
        <PostFooter likeCount={likes} isLiked={likedByMe} postId={postId} />
      </article>
    </section>
  );
}
