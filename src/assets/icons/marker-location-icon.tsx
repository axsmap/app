import React from "react";

export default function MarkerLocationIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M16 17.3333C18.2092 17.3333 20 15.5425 20 13.3333C20 11.1242 18.2092 9.33332 16 9.33332C13.7909 9.33332 12 11.1242 12 13.3333C12 15.5425 13.7909 17.3333 16 17.3333Z"
        stroke="#FDDF00"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 29.3333C21.3334 24 26.6667 19.2244 26.6667 13.3333C26.6667 7.44229 21.8911 2.66666 16 2.66666C10.109 2.66666 5.33337 7.44229 5.33337 13.3333C5.33337 19.2244 10.6667 24 16 29.3333Z"
        stroke="#FDDF00"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
