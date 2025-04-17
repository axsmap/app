"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/ui/custom-input/custom-input";
import { useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "../Services/modules/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showAuthModal } from "@/components/AuthModal/handleAuthModal";
interface ApiError {
  data: {
    general: string;
  };
  status: number;
}
const ResetPassword = () => {
  const { showToast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    key: key,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(formData).unwrap();
      showToast("Password Reset Sucessfully", "success");
      showAuthModal();
      router.push("/login");
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
            Set New Password
          </h2>
          <p className="text-center text-sm text-gray-500">
            Please enter your new password
          </p>
        </div>
        <form className="space-y-4">
          <CustomInput
            name="newPassword"
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center gap-2"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Set Password"
            )}
          </button>
        </form>
        <p
          onClick={() => showAuthModal()}
          className="text-center text-sm text-gray-600"
        >
          <a className="text-blue-500 hover:underline font-medium">
            Back to Login Page
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
