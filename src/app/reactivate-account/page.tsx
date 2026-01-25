"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactivateAccountForm, { SocialLoginArchivedMessage } from "@/components/reactivate-account-form";

function ReactivateAccountContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const socialLogin = searchParams.get("socialLogin") || "";

  // If social login user, show contact support message
  if (socialLogin) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <SocialLoginArchivedMessage provider={socialLogin} />
        </div>
      </div>
    );
  }

  // If no userId, show error message
  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Invalid Request</h2>
          <p className="text-gray-600 mb-6">
            This reactivation link is invalid or has expired. Please try logging in again.
          </p>
          <a
            href="/"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
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
