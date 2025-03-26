import React from "react";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
      >
        {label}
      </label>
      <input
        id={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#969596] font-poppinsRegular text-lg font-normal leading-8"
      />
    </div>
  );
};

export default CustomInput;
