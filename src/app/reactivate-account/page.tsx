"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import ReactivateAccountForm from "@/components/reactivate-account-form/reactivate-account-form";

function ReactivateAccountContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t("reactivateAccount.errors.invalidRequest")}
          </h1>
          <p className="text-gray-600 mb-4">
            {t("reactivateAccount.errors.invalidRequestDescription")}
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {t("reactivateAccount.returnHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <ReactivateAccountForm userId={userId} />
      </div>
    </div>
  );
}

export default function ReactivateAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ReactivateAccountContent />
    </Suspense>
  );
}
