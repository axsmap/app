"use client";
import React, { useState } from "react";
import Stepper from "./stepper";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  disability: string;
  race: string;
  description: string;
  subsciption: boolean;
}

const CreateAccountForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    disability: "",
    race: "",
    description: "",
    subsciption: false,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col gap-6 w-full max-w-[700px] mx-auto mt-10 mb-10 p-6 md:p-10 rounded-2xl bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center">
        Create Your Account
      </h2>
      <Stepper currentStep={step} />

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
    </div>
  );
};

export default CreateAccountForm;
