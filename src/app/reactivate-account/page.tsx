"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactivateAccountForm from "@/components/reactivate-account-form/reactivate-account-form";

function ReactivateAccountContent() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <ReactivateAccountForm email={emailFromUrl} />
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
