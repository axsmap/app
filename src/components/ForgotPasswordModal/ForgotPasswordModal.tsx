"use client";
import { useToast } from "@/components/context/toast-context";
import CustomInput from "@/components/ui/custom-input/custom-input";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import { useForgotPasswordMutation } from "@/Services/modules/auth";
import { useTranslation } from "react-i18next";
import { AuthModalScreenProps } from "@/utils/types";

export interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ForgotPasswordModal: React.FC<AuthModalScreenProps> = ({
  setPage,
  closeAuthModal,
}) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(formData).unwrap();
      showToast(t("forgotPasswordSuccessMessage"), "success");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.data?.general || t("forgotPasswordErrorMessage");
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-[700px] mx-auto bg-white rounded-2xl relative shadow-md mt-8 mb-8 sm:px-6 md:px-10 md:py-10 space-y-6 h-auto max-h-[90vh] overflow-y-auto">
      <div
        onClick={closeAuthModal}
        className="absolute h-10 w-10 right-3 top-3 cursor-pointer"
      >
        <CloseMenuIcon />
      </div>
      <div className="py-6 px-4">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-center sm:text-lg">
            {t("forgotPasswordTitle")}
          </h2>
          <p className="text-center text-sm text-gray-500 sm:text-base">
            {t("forgotPasswordDescription")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            name="email"
            label={t("forgotPasswordEmailLabel")}
            type="email"
            placeholder={t("forgotPasswordEmailPlaceholder")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center sm:py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin items-center" />
            ) : (
              t("forgotPasswordVerifyButton")
            )}
          </button>
        </form>
        <p
          onClick={() => setPage("Login")}
          className="text-center text-sm text-gray-600 mt-5 sm:text-base"
        >
          <a className="text-blue-500 hover:underline font-medium">
            {t("forgotPasswordBackToLogin")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
