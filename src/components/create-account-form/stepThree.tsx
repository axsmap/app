import AppleIcon from "@/assets/icons/apple-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import React, { useState } from "react";
import { FormData } from "./create-account-form";
import CustomInput from "../custom-input/custom-input";

interface StepThreeProps {
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepThree: React.FC<StepThreeProps> = ({
  onBack,
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <CustomInput
          name="description"
          label="Description"
          value={formData.description}
          multiline
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter details about yourself"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={formData.subsciption}
          onChange={(e) =>
            setFormData({ ...formData, subsciption: e.target.checked })
          }
          className="accent-yellow-400"
        />
        I want the AXS Newsletter
      </label>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full border border-gray-300 py-2 rounded-md"
        >
          Back
        </button>
        <button className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition">
          Create Account
        </button>
      </div>

      <div className="text-sm text-center text-gray-500">
        Or create account with
      </div>
      <div className="flex gap-4">
        <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2">
          <GoogleIcon />
          Google
        </button>
        <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2">
          <AppleIcon />
          Apple
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already a user?{" "}
        <a href="/login" className="text-blue-500 hover:underline font-medium">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default StepThree;
