"use client";
import React, { useState } from "react";
import Stepper from "./stepper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { useToast } from "../context/toast-context";
import { AuthModalScreenProps } from "@/utils/types";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import { useRegisterMutation } from "@/Services/modules/auth";
import { useTranslation } from "react-i18next";

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
  const { showToast } = useToast();
  const [register] = useRegisterMutation();
  const { t } = useTranslation(); // Use t for translations
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
      await register({
        ...formData,
        dateOfBirth: formData?.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : "",
      }).unwrap();
      showToast(t("createAccountSuccessMessage"), "success"); // Use t for success message
      setPage("Login");
    } catch (err) {
      const apiError = err as ApiError;
      showToast(t("createAccountErrorMessage"), "error"); // Use t for error message
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
