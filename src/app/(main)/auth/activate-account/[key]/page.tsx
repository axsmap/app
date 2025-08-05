"use client";
import { showAuthModal } from "@/components/AuthModal/handleAuthModal";
import Spinner from "@/components/Spinner";
import { showToast } from "@/components/toast";
import { useActiveAccountQuery } from "@/Services/modules/auth";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const ActivateAccountPage = () => {
  const key = useParams()?.key;
  const { t } = useTranslation();
  const { data: activateAccount, isLoading } = useActiveAccountQuery(
    (key as string) || ""
  );

  useEffect(() => {
    const activate = async () => {
      if (activateAccount) {
        showToast({message:t("accountActivatedSuccessMessage"), type:'success'});
      }
    };
    activate();
  }, [activateAccount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <i className="fa fa-check-circle text-green-500 text-6xl mb-4"></i>
            <h2 className="text-2xl text-green-500 font-semibold mb-4">
              {t("accountActivatedSuccessTitle")}
            </h2>
            <p className="text-gray-700 mb-4">
              {t("accountActivatedSuccessMessage")}{" "}
            </p>
            <button
              onClick={() => showAuthModal()}
              className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {t("goBackToLogin")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccountPage;
