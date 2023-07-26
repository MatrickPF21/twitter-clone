import React from "react";

export interface NavButtonsProps {
  labels: string[];
  onClick: (label: string) => void;
  activeLabel: string;
}

export default function NavButtons({
  labels,
  onClick,
  activeLabel,
}: NavButtonsProps) {
  return (
    <div className='flex items-center border-b border-b-gray-700 text-center'>
      {labels.map((label, idx) => (
        <button
          className='h-[60px] flex-1 transition-colors hover:bg-hover'
          key={idx}
          onClick={() => onClick(label)}
        >
          <div className='relative m-auto flex h-full w-fit flex-col items-center justify-center'>
            <span
              className={`text-sm font-bold ${
                activeLabel === label ? "" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            <div
              className={`absolute bottom-0 h-1 w-full rounded-sm ${
                activeLabel === label ? "bg-primary" : ""
              } `}
            ></div>
          </div>
        </button>
      ))}
    </div>
  );
}
