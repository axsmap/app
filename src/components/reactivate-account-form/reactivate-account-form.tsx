"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import Link from "next/link";

interface ReactivateAccountFormProps {
  userId: string;
}

interface FormErrors {
  [key: string]: string;
}

const ReactivateAccountForm: React.FC<ReactivateAccountFormProps> = ({
  userId,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = t("reactivateAccount.errors.newPasswordRequired") || "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t("reactivateAccount.errors.passwordTooShort") || "Password must be at least 8 characters";
    } else if (formData.newPassword.length > 30) {
      newErrors.newPassword = t("reactivateAccount.errors.passwordTooLong") || "Password must be less than 31 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("reactivateAccount.errors.confirmPasswordRequired") || "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t("reactivateAccount.errors.passwordMismatch") || "Passwords do not match";
    }

    if (!formData.firstName) {
      newErrors.firstName = t("reactivateAccount.errors.firstNameRequired") || "First name is required";
    } else if (formData.firstName.length > 24) {
      newErrors.firstName = t("reactivateAccount.errors.firstNameTooLong") || "First name must be less than 25 characters";
    }

    if (!formData.lastName) {
      newErrors.lastName = t("reactivateAccount.errors.lastNameRequired") || "Last name is required";
    } else if (formData.lastName.length > 36) {
      newErrors.lastName = t("reactivateAccount.errors.lastNameTooLong") || "Last name must be less than 37 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Build request body - only include optional fields if they have values
      const requestBody: Record<string, string> = {
        userId,
        newPassword: formData.newPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      // Add optional fields only if provided
      if (formData.email) requestBody.email = formData.email;
      if (formData.phone) requestBody.phone = formData.phone;
      if (formData.zip) requestBody.zip = formData.zip;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/reactivate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (data.userId || data.newPassword || data.firstName || data.lastName) {
          setErrors(data);
        } else {
          setErrors({ general: data.general || t("reactivateAccount.errors.generalError") });
        }
        return;
      }

      // Store tokens in cookies
      if (data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        dispatch(getTokenSuccess(data.token));
      }
      if (data.refreshToken) {
        Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
      }

      showToast({
        message: t("reactivateAccount.successMessage") || "Your account has been reactivated!",
        type: "success",
      });

      // Redirect to home page
      router.push("/");
    } catch (err) {
      console.error("Reactivation error:", err);
      setErrors({ general: t("reactivateAccount.errors.generalError") || "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all";
  const labelClassName = "block text-gray-700 font-medium mb-1";

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-center mb-2">
        {t("reactivateAccount.title") || "Reactivate Your Account"}
      </h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          {t("reactivateAccount.description") || "Your account was archived due to inactivity (no login for over 1 year). To reactivate, please set a new password and confirm your information."}
        </p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Section */}
        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.newPasswordLabel") || "New Password"} *
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder={t("reactivateAccount.newPasswordPlaceholder") || "Enter your new password"}
            className={inputClassName}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("reactivateAccount.newPasswordHelp") || "8-30 characters"}
          </p>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.confirmPasswordLabel") || "Confirm Password"} *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={t("reactivateAccount.confirmPasswordPlaceholder") || "Re-enter your new password"}
            className={inputClassName}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Personal Information Section */}
        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.firstNameLabel") || "First Name"} *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t("reactivateAccount.firstNamePlaceholder") || "Enter your first name"}
            className={inputClassName}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.lastNameLabel") || "Last Name"} *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t("reactivateAccount.lastNamePlaceholder") || "Enter your last name"}
            className={inputClassName}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.emailLabel") || "Email"} {t("common.optional") || "(optional)"}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("reactivateAccount.emailPlaceholder") || "Update your email address"}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.phoneLabel") || "Phone"} {t("common.optional") || "(optional)"}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("reactivateAccount.phonePlaceholder") || "Enter your phone number"}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            {t("reactivateAccount.zipLabel") || "ZIP Code"} {t("common.optional") || "(optional)"}
          </label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder={t("reactivateAccount.zipPlaceholder") || "Enter your ZIP code"}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? t("reactivateAccount.submitting") || "Reactivating..."
            : t("reactivateAccount.submitButton") || "Reactivate My Account"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        <Link href="/" className="text-blue-600 hover:underline">
          {t("reactivateAccount.backToSignIn") || "Back to Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default ReactivateAccountForm;
