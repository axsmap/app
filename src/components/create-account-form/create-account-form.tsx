"use client";
import React, { useState } from "react";
import Stepper from "./stepper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { useRegisterMutation } from "@/app/Services/modules/auth";
import { useToast } from "../context/toast-context";
import { useRouter } from "next/navigation";
import { AuthModalScreenProps } from "@/utils/types";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";

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
  description: string;
  isSubscribed: boolean;
}

const CreateAccountForm: React.FC<AuthModalScreenProps> = ({
  setPage,
  closeAuthModal,
}) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [register] = useRegisterMutation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    disability: "",
    race: "",
    description: "",
    isSubscribed: false,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      showToast(
        "Account created successfully. Please check your email for user activation",
        "success"
      );
      setPage("Login");
    } catch (err) {
      const apiError = err as ApiError;
      showToast(JSON.stringify(apiError.data), "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative flex-col gap-6 w-full max-w-[700px] mx-auto mt-10 mb-10 p-6 md:p-10 rounded-2xl bg-white shadow-md"
    >
      <div
        onClick={closeAuthModal}
        className="absolute h-10 w-10  right-6 top-6"
      >
        <CloseMenuIcon />
      </div>
      <h2 className="text-2xl font-semibold text-center">
        Create Your Account
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
