"use client";
import FileUploadIcon from "@/assets/icons/file-upload-icon";
import { useRef } from "react";

interface CustomFileUploadProps {
  label: string;
  fileTypeDescription: string;
  onFileChange: (file: File | null) => void;
  icon?: React.ReactNode;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  fileTypeDescription,
  onFileChange,
  icon,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (file) {
      onFileChange(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative flex w-[650px] p-[16px] justify-start items-center border-[1px] border-dashed border-[#FDDF00] bg-[#FFFCE6] rounded-[12px]">
      {icon && <div className="mr-[16px]">{icon}</div>}
      <div className="flex flex-col justify-center items-start flex-grow">
        <label
          htmlFor="file-upload"
          className="font-medium text-[#FDDF00] cursor-pointer flex items-center gap-[8px]"
        >
          {label}
        </label>
        <span className="text-sm text-gray-600 flex items-center gap-[8px]">
          {fileTypeDescription}
        </span>
      </div>
      <div className="ml-10">
        <button
          type="button"
          className="flex items-center justify-center gap-[6px] h-[48px] px-[16px] bg-[#FEE633] text-black rounded-[12px] shadow-[0px_4px_2.8px_0px_rgba(16,24,40,0.05)]"
          onClick={handleClick}
        >
          <FileUploadIcon /> Choose File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CustomFileUpload;
