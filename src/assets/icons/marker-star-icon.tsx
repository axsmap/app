import React from "react";

export default function MarkerStarIcon({ className }: { className?: string }) {
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
        d="M29.3333 16H26.6666M25.4279 25.4281L23.5423 23.5425M5.33329 16H2.66663M8.45719 8.45758L6.57157 6.57196M16 5.33335V2.66669M23.5423 8.45758L25.4279 6.57196M16 29.3334V26.6667M6.57157 25.4281L8.45719 23.5425M16 9.33335L18.06 13.5067L22.6666 14.18L19.3333 17.4267L20.12 22.0134L16 19.8467L11.88 22.0134L12.6666 17.4267L9.33329 14.18L13.94 13.5067L16 9.33335Z"
        stroke="#00A6E8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
