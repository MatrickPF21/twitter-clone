import React from "react";
import { useAutosizeTextArea } from "~/hooks/useAutosizeTextArea";
import Image from "next/image";
import { Button } from "./ui/button";
import { api } from "~/utils/api";

export default function NewTweet() {
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

    mutate({ text: value });
  };

  return (
    <section className='border-b border-t border-gray-700 p-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 p-2 pt-4'>
          <div className='flex gap-4'>
            <div>
              <Image
                className='aspect-square rounded-full'
                src='/assets/images/user.jpg'
                alt='user image'
                width={40}
                height={40}
              />
            </div>
            <textarea
              className='w-full bg-transparent text-xl outline-none'
              placeholder="What's happening?"
              onChange={handleChange}
              ref={textAreaRef}
              rows={1}
              value={value}
              disabled={isLoading}
            />
          </div>
          <div className='flex justify-end p-2'>
            <Button disabled={isLoading}>Tweet</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
