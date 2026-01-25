"use client";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import FacebookIcon from "@/assets/icons/facebook-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import CustomInput from "@/components/ui/custom-input/custom-input";
import { useLoginMutation } from "@/Services/modules/auth";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { AuthModalScreenProps } from "@/utils/types";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { showToast } from "../toast";
import { useRouter } from "next/navigation";

interface ApiError {
  data: {
    general: string;
    isArchived?: boolean;
    requiresReactivation?: boolean;
    userId?: string;
  };
  status: number;
}

const Login: React.FC<AuthModalScreenProps> = ({ setPage, closeAuthModal }) => {
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

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
      // Set cookie expiration based on rememberMe: 90 days if checked, 7 days if not
      const cookieExpiration = formData.rememberMe ? 90 : 7;
      Cookies.set("token", response.token, { expires: cookieExpiration });
      Cookies.set("refreshToken", response.refreshToken, { expires: cookieExpiration });
      showToast({message:t("loginSuccessMessage"), type:'success'});
      closeAuthModal();
    } catch (error) {
      const apiError = error as ApiError;
      
      // Check if account is archived (403 response with isArchived flag)
      if (apiError?.status === 403 && apiError?.data?.isArchived && apiError?.data?.userId) {
        // Close modal and redirect to reactivation page
        closeAuthModal();
        showToast({
          message: t("loginAccountArchived") || "Your account was archived due to inactivity. Please reactivate.",
          type: "info"
        });
        router.push(`/reactivate-account?userId=${apiError.data.userId}`);
        return;
      }
      
      const errorMessage = apiError?.data?.general || t("loginErrorMessage");
      showToast({message:errorMessage, type:'error'});
    }
  };
  const handleGoogleLogin = () => {
    // Store rememberMe preference before OAuth redirect
    sessionStorage.setItem("rememberMe", formData.rememberMe.toString());
    const params = new URLSearchParams({
      client_id: process?.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      redirect_uri: process?.env?.NEXT_PUBLIC_REDIRECT_URL ?? '',
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleFacebookLogin = () => {
    // Store rememberMe preference before OAuth redirect
    sessionStorage.setItem("rememberMe", formData.rememberMe.toString());
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      redirect_uri: `${window.location.origin}/auth/facebook`,
      response_type: "code",
      scope: "email,public_profile",
    });
    window.location.href = `https://www.facebook.com/v17.0/dialog/oauth?${params.toString()}`;
  };

  return (
    <div className="w-full h-full relative">
      <div
        onClick={closeAuthModal}
        className="absolute h-8 w-8 right-0 top-0 cursor-pointer"
      >
        <CloseMenuIcon />
      </div>

      <h2 className="md:text-2xl md:mt-0 mt-2 text-sm font-semibold text-center">{t("loginTitle")}</h2>

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
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
            />
            <span className="md:text-base text-sm">{t("loginRememberMe")}</span>
          </label>

          <p
            className="text-blue-500 md:text-base text-sm hover:underline cursor-pointer"
            onClick={() => setPage("ForgotPassword")}
          >
            {t("loginForgotPassword")}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition flex justify-center items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            t("loginButton")
          )}
        </button>
      </form>

      <div className="text-center md:my-0 my-2 text-sm text-gray-500">
        {t("loginOrLoginWith")}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full"
        >
          
          <GoogleIcon />
          {t("loginGoogleButton")}
        </button>

        <button
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full"
        >
          <FacebookIcon />
          {t("loginFacebookButton")}
        </button>
      </div>

      <div
        onClick={() => setPage("CreateAccount")}
        className="text-center md:mt-0 mt-2 mb-2 md:mb-0 text-sm md:text-md text-gray-700 cursor-pointer"
      >
        {t("loginNoAccount")}{" "}
        <p className="text-blue-500 text-sm  ms:text-md font-medium hover:underline inline">
          {t("loginCreateAccount")}
        </p>
      </div>
    </div>
  );
};

export default Login;
