import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useAutosizeTextArea } from "~/hooks/useAutosizeTextArea";
import { api } from "~/utils/api";
import { Button } from "./ui/button";

export default function NewTweet() {
  const { data } = useSession();
  const context = api.useContext();
  const [value, setValue] = React.useState("");
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);
  const { mutate, isLoading } = api.tweet.create.useMutation({
    onSuccess: () => {
      setValue("");
      context.tweet.list.invalidate();
    },
  });

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!value.trim()) return;

    mutate({ text: value });
  };

  return (
    <section className='border-b border-t border-gray-700 p-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 p-2 pt-4'>
          <div className='flex gap-4'>
            <Link href={`/users/${data?.user.id}`}>
              <Image
                className='aspect-square rounded-full'
                src={data?.user.image || "/assets/images/user.jpg"}
                alt={`${data?.user.name} user image`}
                width={40}
                height={40}
              />
            </Link>
            <textarea
              className='w-full bg-transparent text-xl outline-none'
              placeholder="What's happening?"
              onChange={handleChange}
              ref={textAreaRef}
              rows={1}
              value={value}
              disabled={isLoading}
              required
            />
          </div>
          <div className='flex justify-end p-2'>
            <Button disabled={isLoading || !data?.user}>Tweet</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
