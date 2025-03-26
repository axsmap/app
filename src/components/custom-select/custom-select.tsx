import React, { useState } from "react";

interface CustomSelectProps {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <button
          type="button"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={toggleDropdown}
        >
          <span className="block truncate">{value || "Select an option"}</span>
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="max-h-60 overflow-auto py-1 text-base leading-6">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer select-none relative py-2 px-4 text-gray-900 hover:bg-indigo-600 hover:text-white"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
