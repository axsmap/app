// components/Spinner.tsx

import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-4",
  lg: "h-10 w-10 border-4",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-gray-500",
}) => {
  const spinnerClass = `animate-spin rounded-full border-t-transparent border-solid ${sizeClasses[size]} ${color}`;

  return <div className={spinnerClass}></div>;
};
