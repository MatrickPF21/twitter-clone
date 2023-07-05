import React from "react";
import { useAutosizeTextArea } from "~/hooks/useAutosizeTextArea";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Tweet() {
  const [value, setValue] = React.useState("");
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };
  return (
    <section className="border-b border-t border-gray-700 p-2 pt-[120px]">
      <form action="">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src="/assets/images/user.jpg"
              alt="user image"
              width={40}
              height={40}
            />
            <textarea
              className="w-full bg-transparent text-xl outline-none"
              placeholder="What's happening?"
              onChange={handleChange}
              ref={textAreaRef}
              rows={1}
              value={value}
            />
          </div>
          <div className="flex justify-end p-2">
            <Button>Tweet</Button>
          </div>
        </div>
      </form>
    </section>
  );
}

// rounded-full bg-primary px-6 py-2 font-bold transition-opacity hover:opacity-90