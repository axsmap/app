"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactivateAccountForm from "@/components/reactivate-account-form";
import Link from "next/link";

function ReactivateAccountContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const socialLogin = searchParams.get("socialLogin") || "";
  const archived = searchParams.get("archived") || "";
  const email = searchParams.get("email") || "";

  // If social login user WITHOUT userId (legacy backend), show message to use Forgot Password
  if (socialLogin && !userId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Archived</h2>
          <p className="text-gray-600 mb-6">
            Your account has been archived due to inactivity. To reactivate, please use the <strong>Forgot Password</strong> feature to set a new password.
          </p>
          <Link
            href="/?forgotPassword=true"
            className="inline-block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3"
          >
            Reset Password
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // If archived but no userId (legacy backend), show message to use Forgot Password
  if (archived && !userId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Archived</h2>
          <p className="text-gray-600 mb-6">
            Your account has been archived due to inactivity. To reactivate your account, please use the <strong>Forgot Password</strong> feature to reset your password. This will automatically reactivate your account.
          </p>
          {email && (
            <p className="text-sm text-gray-500 mb-4">
              Email: <strong>{email}</strong>
            </p>
          )}
          <Link
            href="/?forgotPassword=true"
            className="inline-block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3"
          >
            Reset Password
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // If no userId and not archived flag, show error message
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
