"use client";

import { showAuthModal } from "@/components/AuthModal/handleAuthModal";
import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/ui/custom-input/custom-input";
import { useResetPasswordMutation } from "@/Services/modules/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ResetPasswordForm = () => {
  const { showToast } = useToast();
  const { t } = useTranslation();
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
      showToast(t("resetPasswordSuccessMessage"), "success");
      showAuthModal();
      router.push("/");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.data?.general || t("resetPasswordErrorMessage");
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-6 shadow-lg animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">{t("resetPasswordTitle")}</h2>
          <p className="text-sm text-gray-600">
            {t("resetPasswordDescription")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            name="newPassword"
            label={t("resetPasswordLabel")}
            type="password"
            placeholder={t("resetPasswordPlaceholder")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              t("resetPasswordButton")
            )}
          </button>
        </form>

        {/* Back to login link */}
        <div className="text-center">
          <p
            onClick={showAuthModal}
            className="text-sm text-blue-500 hover:underline font-medium cursor-pointer"
          >
            {t("resetPasswordBackToLogin")}
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};
export default ResetPassword;
