import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "~/server/auth";
import MainLayout from "~/components/Layout";
import DiscordIcon from "~/components/icons/Discord";
import { Button } from "~/components/ui/button";

export default function SignUpPage() {
  const handleSignDiscord = () => {
    signIn("discord", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <MainLayout className="w-full border-none">
      <div className="flex min-h-screen">
        <div className="relative min-h-[45vh] w-full min-w-[45vw]">
          <Image src={"/assets/images/sign_in_bg.png"} alt="bg" fill={true} />
          <Image
            src={"/favicon.svg"}
            alt="Twitter icon"
            fill={true}
            className="!left-1/2 !top-1/2 !w-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="min-w-[45vw] p-4">
          <div className="flex flex-col p-5">
            <div>
              <Image
                src={"/favicon.svg"}
                alt="icon"
                width={45}
                height={45}
                className="pb-3"
              />
            </div>
            <div className="my-12 font-chirp-extended">
              <h1 className="text-[64px] font-bold">Happening now</h1>
            </div>
            <div className="">
              <h2 className="mb-8 font-chirp-extended text-[31px] font-bold">
                Join Twitter today.
              </h2>
              <div className="flex w-[320px] flex-col">
                <div className="">
                  <Button
                    className="flex w-full items-center justify-center bg-white font-bold text-black"
                    onClick={handleSignDiscord}
                  >
                    <DiscordIcon className="mr-2 h-6 w-6" />
                    Sign up with Discord
                  </Button>
                </div>
                <div className="my-2 flex h-5  items-center gap-2">
                  <div className="h-[1px] w-full bg-[#2f3336]" />
                  <div>
                    <span>or</span>
                  </div>
                  <div className="h-[1px] w-full bg-[#2f3336]" />
                </div>
                <div className="">
                  <Button className="w-full">Create account</Button>
                </div>
                <div className="mb-5 mt-2">
                  <p className="text-[11px]">
                    By signing up, you agree to the Terms of Service and Privacy
                    Policy, including Cookie Use.
                  </p>
                </div>
                <div className="mt-10">
                  <div className="mb-5 text-[17px] font-bold">
                    <span>Already have an account?</span>
                  </div>
                  <div className="w-full">
                    <Button className="flex w-full items-center justify-center border border-[#2f3336] bg-transparent text-primary hover:bg-[#031018]">
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
