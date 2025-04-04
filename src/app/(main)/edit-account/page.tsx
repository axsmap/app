"use client";
import CustomInput from "@/components/custom-input/custom-input";
import CustomSelect from "@/components/custom-select/custom-select";
import React, { useState } from "react";

const EditAccountForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    gender: "",
    newsletter: true,
    language: "",
    phoneNumber: "",
    showDisability: false,
    showEmail: false,
    showPhone: false,
    username: "",
    zip: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-8 bg-white rounded-xl space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Edit Account Details
      </h2>

      <div className="w-[60px] h-[60px] bg-gray-200 rounded-full" />

      <div>
        <CustomInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <CustomInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Short Description here..."
          multiline
        />
      </div>

      <div>
        <CustomSelect
          name="gender"
          label="Gender"
          value={formData.gender}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={(e) =>
            setFormData({ ...formData, newsletter: e.target.checked })
          }
          className="w-4 h-4"
        />
        <label className="text-sm text-gray-600">
          I want the AXS Newsletter
        </label>
      </div>

      <div>
        <CustomSelect
          name="language"
          label="Language"
          value={formData.language}
          options={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "france" },
          ]}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
        />
      </div>

      <div>
        <CustomInput
          label="Phone Number"
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showDisability"
            checked={formData.showDisability}
            onChange={(e) =>
              setFormData({ ...formData, showDisability: e.target.checked })
            }
            className="w-4 h-4"
          />
          Show my disabilities in profile
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showEmail"
            checked={formData.showEmail}
            onChange={(e) =>
              setFormData({ ...formData, showEmail: e.target.checked })
            }
            className="w-4 h-4"
          />
          Show my email in profile
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="showPhone"
            checked={formData.showPhone}
            onChange={(e) =>
              setFormData({ ...formData, showPhone: e.target.checked })
            }
            className="w-4 h-4"
          />
          Show my phone number in profile
        </label>
      </div>

      <div>
        <CustomInput
          type="text"
          name="username"
          label="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>

      <div>
        <CustomInput
          type="text"
          name="zip"
          label="ZIP"
          value={formData.zip}
          placeholder="Enter zip code"
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        />
      </div>
      <div className="text-[#363537] font-sans text-xl font-medium leading-8">
        Teams
      </div>
      <div className="text-[#363537] font-sans text-xl font-medium leading-8">
        Mapathons
      </div>
      <div className="text-[#363537] font-sans text-xl font-medium leading-8">
        Petition
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-[#363537] font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditAccountForm;
