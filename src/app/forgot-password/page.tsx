"use client";
import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/custom-input/custom-input";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../Services/modules/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ForgotPassword = () => {
  const { showToast } = useToast();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(formData).unwrap();
      showToast("Password reset link sent to your email!", "success");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.data?.general || "An unexpected error occurred.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px] bg-white rounded-2xl shadow-md sm:px-6 md:px-10 md:py-10 space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            Reset Your Password
          </h2>
          <p className="text-center text-sm text-gray-500">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin items-center" />
            ) : (
              "Verify Email"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            {" "}
            Back to Login Page
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
