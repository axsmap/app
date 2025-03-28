import React from "react";

interface MapIconProps {
  width?: number;
  height?: number;
}
export default function MapIcon({ width = 32, height = 32 }: MapIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M11.9998 24L2.6665 29.3333V8.00001L11.9998 2.66667M11.9998 24L21.3332 29.3333M11.9998 24V2.66667M21.3332 29.3333L29.3332 24V2.66667L21.3332 8.00001M21.3332 29.3333V8.00001M21.3332 8.00001L11.9998 2.66667"
        stroke="#E80000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
