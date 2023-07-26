import React from "react";
import { twMerge } from "tailwind-merge";

export interface HeaderProps extends React.ComponentProps<"section"> {}

export default function Header({
  children,
  className,
  ...props
}: React.PropsWithChildren<HeaderProps>) {
  return (
    <section
      className={twMerge(
        "sticky top-0 z-10 w-[600px] border-b border-gray-700 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
