"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  name?: string;
  multiline?: boolean; // new prop
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  multiline = false,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={label}
        className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
      >
        {label}
      </label>

      <div className="relative mt-1">
        {multiline ? (
          <textarea
            id={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className="block w-full px-4 py-3 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#363537] text-sm font-normal leading-8"
          />
        ) : (
          <>
            <input
              id={label}
              name={name}
              type={isPassword && showPassword ? "text" : type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="block w-full p-2 px-4 pr-8 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#363537] text-sm font-normal leading-8"
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
