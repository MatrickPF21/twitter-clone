import Sidebar from "./Sidebar";
import { twMerge } from "tailwind-merge";

interface MainLayoutProps extends React.ComponentProps<"main"> {
  sidebar?: true;
}

export default function MainLayout({
  children,
  className,
  sidebar,
  ...props
}: React.PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="flex min-h-screen bg-black">
      {sidebar && <Sidebar />}
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
