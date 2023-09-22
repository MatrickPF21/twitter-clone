import React from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";

import HomeHeader from "~/components/HomeHeader";
import MainLayout from "~/components/Layout";
import Post from "~/components/Post";
import NewTweet from "~/components/NewTweet";
import { getServerAuthSession } from "~/server/auth";
import { ssrHelper } from "~/server/api/ssrHelper";
import { api } from "~/utils/api";
import LoadSpinner from "~/components/LoadSpinner";

export default function Home() {
  const { data: tweets, isLoading } = api.tweet.list.useQuery();

  let content;

  if (isLoading) {
    content = (
      <div className='flex min-h-full w-full items-center justify-center'>
        <LoadSpinner />
      </div>
    );
  } else if (tweets?.length) {
    content = tweets.map(tweet => (
      <Post
        key={tweet.id}
        authorName={tweet.user.name}
        authorScreenName={tweet.user.screenName}
        datetime={tweet.createadAt.toISOString()}
        likes={tweet.likesCounter}
        text={tweet.text}
        likedByMe={tweet.likedByMe}
        postId={tweet.id}
        authorImage={tweet.user.image}
        authorId={tweet.user.id}
      />
    ));
  }

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Created with create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout className='relative' sidebar>
        <div className='w-[600px]'>
          <HomeHeader />
          <NewTweet />
          {content}
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const userId = session.user.id;

  await ssrHelper.profile.baseById.prefetch({ id: userId });
  await ssrHelper.tweet.list.prefetch();

  return {
    props: {
      trpcState: ssrHelper.dehydrate(),
    },
  };
};
