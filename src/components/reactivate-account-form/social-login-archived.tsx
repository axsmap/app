"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface SocialLoginArchivedMessageProps {
  provider: string;
}

const SocialLoginArchivedMessage: React.FC<SocialLoginArchivedMessageProps> = ({
  provider,
}) => {
  const { t } = useTranslation();
  
  const providerName = provider === "google" ? "Google" : provider === "facebook" ? "Facebook" : provider;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
          <svg
            className="h-8 w-8 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {t("reactivateAccount.socialLogin.title") || "Account Archived"}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {t("reactivateAccount.socialLogin.description", { provider: providerName }) || 
            `Your account has been archived due to inactivity. Since you originally signed up with ${providerName}, you'll need to contact our support team to reactivate your account.`}
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-medium text-blue-900 mb-2">
            {t("reactivateAccount.socialLogin.whyTitle") || "Why can't I reactivate automatically?"}
          </h3>
          <p className="text-sm text-blue-800">
            {t("reactivateAccount.socialLogin.whyDescription") || 
              "For security reasons, accounts created with social login (Google/Facebook) cannot be reactivated through a password reset. Our support team will verify your identity to ensure your account's safety."}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/contact"
            className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            {t("reactivateAccount.socialLogin.contactSupport") || "Contact Support"}
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            {t("reactivateAccount.socialLogin.backToHome") || "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginArchivedMessage;
