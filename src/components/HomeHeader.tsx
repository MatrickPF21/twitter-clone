import React from "react";
import Header from "./Header";

export interface HomeHeaderProps {}

export default function HomeHeader(props: HomeHeaderProps) {
  return (
    <Header>
      <header className='text-lg font-semibold'>
        <h1 className='p-4 text-xl font-bold'>Home</h1>
        <div className='flex items-center text-center'>
          <button className='h-[60px] flex-1 transition-colors hover:bg-hover'>
            <div className='relative m-auto flex h-full w-fit flex-col items-center justify-center'>
              <span className='text-sm font-bold'>For you</span>
              <div className='absolute bottom-0 h-1 w-full rounded-sm bg-primary'></div>
            </div>
          </button>
          <button className='h-[60px] flex-1 transition-colors hover:bg-hover'>
            <div className='relative m-auto flex h-full w-fit flex-col items-center justify-center'>
              <span className='text-sm font-bold'>Following</span>
              <div className='absolute bottom-0 h-1 w-full rounded-sm bg-primary'></div>
            </div>
          </button>
        </div>
      </header>
    </Header>
  );
}
