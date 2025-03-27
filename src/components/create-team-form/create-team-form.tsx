"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomInput from "../custom-input/custom-input";
import CustomFileUpload from "../custom-file-upload/custom-file-upload";
import UploadIcon from "@/assets/icons/upload-icon";

const CreateTeamForm: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/teams");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Create Your Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            name="name"
            label="Name"
            placeholder="Name of your Team"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#969596] font-poppinsRegular text-lg font-normal leading-8"
            placeholder="Short Description here..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <CustomFileUpload
            icon={<UploadIcon />}
            label="Add Avatar"
            fileTypeDescription="Files should be less than 5MB."
            onFileChange={handleFileChange}
          />
        </div>

        <div className="mt-4 flex justify-left">
          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
          >
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;
