"use client";

import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/custom-input/custom-input";
import React, { useState } from "react";

const ResetPassword = () => {
  //   const { showToast } = useToast();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px] bg-white rounded-2xl shadow-md sm:px-6 md:px-10 md:py-10 space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            Set New Password
          </h2>
          <p className="text-center text-sm text-gray-500">
            Please enter your new password
          </p>
        </div>
        <div className="space-y-4">
          <CustomInput
            name="newPassword"
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />

          <CustomInput
            name="password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>

        <button
          className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
          onClick={handleSubmit}
        >
          Set Password
        </button>
        <p className="text-center text-sm text-gray-600">
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Back to Login Page
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
