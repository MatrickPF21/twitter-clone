import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import AccountMenu from "./AccountMenu";

const links = [
  {
    href: "/",
    label: "Home",
    Icon: HomeIcon,
  },
];

export default function Sidebar() {
  return (
    <header className="sticky left-0 top-0 flex h-screen w-[350px] flex-col p-4 pl-24">
      <ul className="flex flex-1 flex-col justify-start gap-2">
        <li className="text-white">
          <div className="w-fit rounded-full p-3 transition-colors hover:bg-hover">
            <Link href="/">
              <Image src="/favicon.svg" width={28} height={28} alt="logo" />
            </Link>
          </div>
        </li>
        {links.map(({ Icon, ...link }) => (
          <li key={link.href} className="text-white">
            <div className="w-fit rounded-full p-3 transition-colors hover:bg-hover">
              <Link href="/" className="flex items-center gap-4">
                <Icon className="h-7 w-7" />
                <span className="text-xl font-bold">{link.label}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <AccountMenu />
    </header>
  );
}
