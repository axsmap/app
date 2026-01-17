"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CreateAccountForm from "@/components/create-account-form/create-account-form";
import { AuthModalScreens } from "@/utils/types";

export default function SignUpPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  const handleSetPage = (page: AuthModalScreens) => {
    if (page === "Login") {
      // Redirect to home and open login modal via URL param
      router.push("/?login=true");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <CreateAccountForm
          setPage={handleSetPage}
          closeAuthModal={handleClose}
        />
      </div>
    </div>
  );
}
