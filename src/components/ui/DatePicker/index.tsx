"use client";

import * as React from "react";
import { format } from "date-fns";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  label?:string
}

export function DatePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a date",
  label='Pick Date'
}: DatePickerProps) {
  return (
    <div className="relative">
      <label className="block text-[#363537] font-poppinsRegular text-sm md:text-2xs font-normal leading-8">
        {label}
      </label>
      <input
        type="date"
        value={value ? format(value, "yyyy-MM-dd") : ""}
        onChange={(e) => {
          if (!e.target.value) {
            onChange?.(undefined);
            return;
          }
          // Parse the date string (YYYY-MM-DD) and create a Date in local timezone
          // Using new Date("YYYY-MM-DD") creates a UTC date which can shift days
          const [year, month, day] = e.target.value.split("-").map(Number);
          const date = new Date(year, month - 1, day); // month is 0-indexed
          onChange?.(date);
        }}
        className={`w-full px-4 md:py-2 py-2 text-[10px] md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          className || ""
        }`}
        placeholder={placeholder}
      />
      {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div> */}
    </div>
  );
}
