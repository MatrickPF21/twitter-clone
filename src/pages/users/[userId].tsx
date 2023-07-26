import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";

import Header from "~/components/Header";
import MainLayout from "~/components/Layout";
import NavButtons from "~/components/NavButtons";
import ProfileHeader from "~/components/ProfileHeader";
import { Button } from "~/components/ui/button";
import { ssrHelper } from "~/server/api/ssrHelper";

const navs = ["Tweets", "Replies", "Highlights", "Media", "Likes"] as const;
type Nav = (typeof navs)[number];

export default function UserProfile() {
  const [activeNav, setActiveNav] = React.useState<Nav>("Tweets");

  return (
    <>
      <MainLayout sidebar>
        <div className='w-[600px]'>
          <ProfileHeader />
          <div>
            <div className='relative h-[200px] w-full bg-[#15202b]'>
              {/* <Image
                src='/assets/images/bg_profile.jpg'
                fill
                alt='user image'
              /> */}
            </div>
            <div className='relative'>
              <div className='p-3'>
                <div className='absolute -top-[72px] aspect-square w-36 overflow-hidden rounded-full'>
                  <Image
                    src='/assets/images/user.jpg'
                    fill
                    alt='user profile'
                  />
                </div>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    size='icon'
                    className='border border-gray-500 bg-transparent p-2 hover:bg-hover'
                  >
                    <EllipsisHorizontalIcon className='h-5 w-5' />
                  </Button>
                  <Button
                    size='icon'
                    className='border border-gray-500 bg-transparent p-2 hover:bg-hover'
                  >
                    <EnvelopeIcon className='h-5 w-5' />
                  </Button>
                  <Button
                    size='icon'
                    className='border border-[#f91880] bg-transparent p-2 text-[#f91880] hover:bg-hover'
                  >
                    <UserPlusIcon className='h-5 w-5' />
                  </Button>
                  <Button variant='noir'>Follow</Button>
                </div>
                <div>
                  <div className='mb-2'>
                    <h2 className='pt-8 text-xl font-bold'>Username</h2>
                    <div>
                      <span className='text-gray-500'>@Username</span>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Hic, non! Eveniet voluptates sequi, nulla dolore quidem vel
                    blanditiis ut inventore optio dignissimos ea suscipit amet
                    sit earum mollitia eaque nesciunt.
                  </p>
                  <div className='mb-2 flex gap-4 text-gray-500'>
                    <div>
                      <span className='font-bold text-white'>0</span> Following
                    </div>
                    <div>
                      <span className='font-bold text-white'>3.4M</span>{" "}
                      Followers
                    </div>
                  </div>
                </div>
              </div>
              <NavButtons
                labels={["Tweets", "Replies", "Highlights", "Media", "Likes"]}
                onClick={label => setActiveNav(label as Nav)}
                activeLabel={activeNav}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const userId = context.params?.userId;

  if (!userId || Array.isArray(userId))
    return {
      props: {
        error: true,
      },
    };

  await ssrHelper.profile.extendedById.prefetch(userId);

  return {
    props: {
      trpcState: ssrHelper.dehydrate(),
    },
  };
};
