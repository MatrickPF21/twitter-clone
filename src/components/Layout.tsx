import Sidebar from "./Sidebar";
import { twMerge } from "tailwind-merge";

interface MainLayoutProps extends React.ComponentProps<"main"> {}

export default function MainLayout({
  children,
  className,
  ...props
}: React.PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main
        className={twMerge(
          "border-l border-r border-gray-700 text-white",
          className
        )}
        {...props}
      >
        {children}
      </main>
    </div>
  );
}
