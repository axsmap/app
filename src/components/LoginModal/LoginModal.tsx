"use client";
import AppleIcon from "@/assets/icons/apple-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import CustomInput from "@/components/ui/custom-input/custom-input";
import React, { useState } from "react";
import { useToast } from "@/components/context/toast-context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
// import { AuthModalScreenProps } from "@/utils/types";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/Services/modules/auth";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { useTranslation } from "react-i18next";
import { AuthModalScreenProps } from "@/utils/types";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const Login: React.FC<AuthModalScreenProps> = ({ setPage, closeAuthModal }) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      dispatch(getTokenSuccess(response.token));
      Cookies.set("token", response.token, { expires: 7 });
      Cookies.set("refreshToken", response.refreshToken, { expires: 7 });
      showToast(t("loginSuccessMessage"), "success");
      closeAuthModal();
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError?.data?.general || t("loginErrorMessage");
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full relative max-w-[700px] mx-auto bg-white rounded-2xl shadow-md mt-8 mb-8 sm:px-6 md:px-10 md:py-10 space-y-6">
      <div
        onClick={closeAuthModal}
        className="absolute h-10 w-10  right-6 top-6"
      >
        <CloseMenuIcon />
      </div>
      <h2 className="text-2xl font-semibold text-center"> {t("loginTitle")}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          name="email"
          label={t("loginEmailLabel")}
          type="email"
          placeholder={t("loginEmailPlaceholder")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <CustomInput
          type="password"
          name="password"
          label={t("loginPasswordLabel")}
          placeholder={t("loginPasswordPlaceholder")}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <div className="flex justify-between items-center text-sm">
          <span>
            <input type="checkbox" id="rememberMe" className="mr-2" />
            {t("loginRememberMe")}
          </span>
          <p
            className="text-blue-500 hover:underline"
            onClick={() => setPage("ForgotPassword")}
          >
            {t("loginForgotPassword")}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            t("loginButton")
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        {t("loginOrLoginWith")}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() =>
            validateLogin(() => {
              alert("function has been called");
            })()
          }
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full"
        >
          <GoogleIcon />
          {t("loginGoogleButton")}
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
          <AppleIcon />
          {t("loginAppleButton")}
        </button>
      </div>

      <div
        onClick={() => setPage("CreateAccount")}
        className="text-center text-md text-gray-700"
      >
        {t("loginNoAccount")}{" "}
        <p className="text-blue-500 font-medium hover:underline">
          {t("loginCreateAccount")}
        </p>
      </div>
    </div>
  );
};

export default Login;
