import React from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";

import HomeHeader from "~/components/HomeHeader";
import MainLayout from "~/components/Layout";
import Post from "~/components/Post";
import Tweet from "~/components/Tweet";
import { getServerAuthSession } from "~/server/auth";
import { ssrHelper } from "~/server/api/ssrHelper";

export default function Home() {
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
          <Post />
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

  return {
    props: {
      trpcState: ssrHelper.dehydrate(),
    },
  };
};
