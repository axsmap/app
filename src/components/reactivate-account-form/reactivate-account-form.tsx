"use client";
import React, { useState, useEffect } from "react";
import Stepper from "../create-account-form/stepper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";

interface ApiError {
  status: number;
  data: {
    [key: string]: string;
  };
}

export interface ReactivateFormData {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  disability: string;
  race: string;
  aboutMe: string;
  isSubscribed: boolean;
  dateOfBirth: any;
  gender: string;
}

interface ReactivateAccountFormProps {
  userId: string;
}

const ReactivateAccountForm: React.FC<ReactivateAccountFormProps> = ({
  userId,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ReactivateFormData>({
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    disability: "",
    race: "",
    aboutMe: "",
    isSubscribed: false,
    dateOfBirth: "",
    gender: "",
  });

  // Fetch user data to prefill the form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        // Prefill form with existing user data
        setFormData((prev) => ({
          ...prev,
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          disability: userData.disability || "",
          race: userData.race || "",
          aboutMe: userData.aboutMe || userData.description || "",
          isSubscribed: userData.isSubscribed || false,
          dateOfBirth: userData.birthday ? new Date(userData.birthday) : "",
          gender: userData.gender || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast({
          message: t("reactivateAccount.errors.failedToLoadData"),
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userId, t]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reactivate-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            ...formData,
            birthday: formData?.dateOfBirth
              ? formData.dateOfBirth.toISOString()
              : "",
            disabilities: formData.disability ? [formData.disability] : [],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.general || t("reactivateAccount.errors.generalError");
        showToast({ message: errorMessage, type: "error" });
        return;
      }

      // Store tokens
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      showToast({
        message: t("reactivateAccount.successMessage"),
        type: "success",
      });

      // Redirect to account page
      router.push("/my-account");
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Reactivation error:", apiError);
      showToast({
        message: t("reactivateAccount.errors.generalError"),
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner />
          <p className="mt-4 text-gray-600">{t("reactivateAccount.loadingData")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-center mb-2">
        {t("reactivateAccount.title")}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {t("reactivateAccount.description")}
      </p>

      <Stepper currentStep={step} />

      <form onSubmit={handleSubmit} className="mt-6">
        {step === 1 && (
          <StepOne
            onNext={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <StepTwo
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <StepThree
            onBack={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </form>
    </div>
  );
};

export default ReactivateAccountForm;
