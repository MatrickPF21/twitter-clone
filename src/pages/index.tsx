import React from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";

import HomeHeader from "~/components/HomeHeader";
import MainLayout from "~/components/Layout";
import Post from "~/components/Post";
import Tweet from "~/components/Tweet";
import { getServerAuthSession } from "~/server/auth";
import { ssrHelper } from "~/server/api/ssrHelper";
import { api } from "~/utils/api";

export default function Home() {
  const { data: tweets } = api.tweet.list.useQuery();

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <meta name="description" content="Created with create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout className="relative" sidebar>
        <div className="w-[600px]">
          <HomeHeader />
          <Tweet />
          {!!tweets?.length &&
            tweets.map((tweet) => (
              <Post
                key={tweet.id}
                authorName={tweet.user.name}
                authorScreenName={tweet.user.screenName}
                datetime={tweet.createadAt.toISOString()}
                likes={tweet.likesCounter}
                text={tweet.text}
              />
            ))}
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
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
