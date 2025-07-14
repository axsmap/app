import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  options: Option[];
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  name,
  value,
  onChange,
  error,
  onBlur,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={label}
        className="block text-[#363537] font-poppinsRegular text-sm md:text-base font-normal leading-8"
      >
        {label}
      </label>
      <div className="mt-1">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-4 md:py-3 py-2  pr-8 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#363537] text-[10px] md:text-sm font-normal leading-8"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-[14px] mt-2">{error}</p>}
    </div>
  );
};

export default CustomSelect;
