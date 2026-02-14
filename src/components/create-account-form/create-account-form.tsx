"use client";
import React, { useState } from "react";
import Stepper from "./stepper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { AuthModalScreenProps } from "@/utils/types";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import { useRegisterMutation } from "@/Services/modules/auth";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast";
import { useRouter } from "next/navigation";

interface ApiError {
  status: number;
  data: {
    [key: string]: string;
  };
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  disability: string;
  race: string;
  aboutMe: string;
  isSubscribed: boolean;
  dateOfBirth: any;
  gender: string;
}

const CreateAccountForm: React.FC<AuthModalScreenProps> = ({
  setPage,
  closeAuthModal,
}) => {
  const [register] = useRegisterMutation();
  const { t } = useTranslation(); // Use t for translations
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    disability: "",
    race: "",
    aboutMe: "",
    isSubscribed: false,
    dateOfBirth: "",
    gender: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Format date as ISO string but at noon UTC to avoid timezone date shifts
      // Using noon (12:00) ensures the date won't roll back/forward in any timezone
      let formattedDateOfBirth = "";
      if (formData?.dateOfBirth) {
        const d = formData.dateOfBirth;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        // Send as ISO string at noon UTC to prevent date shifting
        formattedDateOfBirth = `${year}-${month}-${day}T12:00:00.000Z`;
      }
      
      await register({
        ...formData,
        dateOfBirth: formattedDateOfBirth,
      }).unwrap();
      showToast({message:t("createAccountSuccessMessage"), type:'success'}); // Use t for success message
      closeAuthModal(); // Close the modal
      router.push("/faq"); // Redirect new users to FAQ page
    } catch (err) {
      const apiError = err as ApiError;
      console.log("Registration error:", apiError);
      // Extract specific error message from backend response
      const errorData = apiError?.data;
      let errorMessage = t("createAccountErrorMessage");
      if (errorData) {
        // Backend returns field-specific errors like { email: "Is already taken", password: "..." }
        const fieldErrors = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        if (fieldErrors) {
          errorMessage = fieldErrors;
        }
      }
      showToast({message: errorMessage, type:'error'});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full relative">
      <div
        onClick={closeAuthModal}
        className="absolute h-8 w-8 right-0 top-0 cursor-pointer"
      >
        <CloseMenuIcon />
      </div>
      <h2 className="md:text-2xl md:mt-0 mt-2 text-sm font-semibold text-center">
        {t("createAccountTitle")}
      </h2>
      <Stepper currentStep={step} />

      {step === 1 && (
        <StepOne
          onNext={nextStep}
          formData={formData}
          setFormData={setFormData}
          setPage={setPage}
          closeAuthModal={closeAuthModal}
        />
      )}
      {step === 2 && (
        <StepTwo
          onNext={nextStep}
          onBack={prevStep}
          formData={formData}
          setFormData={setFormData}
          setPage={setPage}
          closeAuthModal={closeAuthModal}
        />
      )}
      {step === 3 && (
        <StepThree
          onBack={prevStep}
          formData={formData}
          setFormData={setFormData}
          setPage={setPage}
          closeAuthModal={closeAuthModal}
        />
      )}
    </form>
  );
};

export default CreateAccountForm;
