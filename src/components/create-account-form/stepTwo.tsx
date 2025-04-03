import React, { useState } from "react";
import CustomInput from "../custom-input/custom-input";
import { FormData } from "./create-account-form";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepTwo: React.FC<StepTwoProps> = ({
  onNext,
  onBack,
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      <CustomInput
        label="Disability"
        name="disability"
        value={formData.disability}
        onChange={(e) =>
          setFormData({ ...formData, disability: e.target.value })
        }
        placeholder="Enter your disabilities here"
      />
      <CustomInput
        label="Race"
        name="race"
        value={formData.race}
        onChange={(e) => setFormData({ ...formData, race: e.target.value })}
        placeholder="Enter your race here"
      />
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full border border-gray-300 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
