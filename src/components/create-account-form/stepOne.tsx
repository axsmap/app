import React, { useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { FormData } from "./create-account-form";
import { AuthModalScreenProps } from "@/utils/types";

interface StepOneProps extends AuthModalScreenProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepOne: React.FC<StepOneProps> = ({
  onNext,
  setPage,
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      <CustomInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder="Enter your first name"
      />
      <CustomInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder="Enter your last name"
      />
      <CustomInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onNext}
        className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
      >
        Next
      </button>
      <p
        onClick={() => setPage("Login")}
        className="text-center text-sm text-gray-600"
      >
        Already a user?{" "}
        <a className="text-blue-500 hover:underline font-medium">Sign in</a>
      </p>
    </div>
  );
};

export default StepOne;
