import React from "react";

export default function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10 10.8334C11.3807 10.8334 12.5 9.71407 12.5 8.33335C12.5 6.95264 11.3807 5.83335 10 5.83335C8.61929 5.83335 7.5 6.95264 7.5 8.33335C7.5 9.71407 8.61929 10.8334 10 10.8334Z"
        stroke="#363537"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.3334C13.3333 15 16.6667 12.0153 16.6667 8.33335C16.6667 4.65146 13.6819 1.66669 10 1.66669C6.3181 1.66669 3.33334 4.65146 3.33334 8.33335C3.33334 12.0153 6.66667 15 10 18.3334Z"
        stroke="#363537"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
