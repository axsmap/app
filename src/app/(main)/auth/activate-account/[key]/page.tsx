"use client";
import { useActiveAccountMutation } from "@/app/Services/modules/auth";
import { showAuthModal } from "@/components/AuthModal/handleAuthModal";
import { useToast } from "@/components/context/toast-context";
import Spinner from "@/components/Spinner";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ActivateAccountPage = () => {
  const { key } = useParams();
  const { showToast } = useToast();
  const router = useRouter();
  const [activateAccount, { isLoading }] = useActiveAccountMutation();

  useEffect(() => {
    const activate = async () => {
      if (key && typeof key === "string") {
        try {
          await activateAccount(key).unwrap();
          showToast("Account activated Successfully", "success");
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage = apiError?.data?.general;
          showToast(errorMessage, "error");
        }
      }
    };
    activate();
  }, [key, activateAccount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center items-center ">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <i className="fa fa-check-circle text-green-500 text-6xl mb-4"></i>
            <h2 className="text-2xl text-green-500 font-semibold mb-4">
              Account Activated Successfully!
            </h2>
            <p className="text-gray-700 mb-4">
              Your account has been successfully activated. You can now log in.
            </p>
            <button
              onClick={() => showAuthModal()}
              className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Go Back to Login Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccountPage;
