import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal, { type RequiredModalProps } from "./Modal";
import { Button } from "./ui/button";
import DiscordIcon from "./icons/Discord";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { signIn } from "next-auth/react";

export interface AuthModalProps extends RequiredModalProps {
  handleSignDiscord: () => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function AuthModal({
  onOpenChange,
  open,
  handleSignDiscord,
}: AuthModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUnregister: true,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    signIn("credentials", {});
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex w-full items-center justify-center">
          <Image src="/favicon.svg" alt="logo" width={30} height={30} />
        </div>
      }
    >
      <div className="mx-auto w-96">
        <div className="p-6 pt-0">
          <h2 className="mb-8 text-center text-[31px] font-bold">
            Sign in to Twitter
          </h2>
          <div className="flex w-[320px] flex-col">
            <div className="">
              <Button
                variant="bw"
                className="flex w-full items-center justify-center"
                onClick={handleSignDiscord}
              >
                <DiscordIcon className="mr-2 h-6 w-6" />
                Sign in with Discord
              </Button>
            </div>

            {/* <div className="my-2 flex h-5  items-center gap-2">
              <div className="h-[1px] w-full bg-[#2f3336]" />
              <div>
                <span>or</span>
              </div>
              <div className="h-[1px] w-full bg-[#2f3336]" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@domain.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Must have at least 8 characters"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="bw" className="w-full">
                  Sign in
                </Button>
              </form>
            </Form> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
