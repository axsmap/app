import React, { useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { FormData } from "./create-account-form";
import { AuthModalScreenProps } from "@/utils/types";
import { useTranslation } from "react-i18next";

interface StepOneProps extends AuthModalScreenProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepOne: React.FC<StepOneProps> = ({
  onNext,
  setPage,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    let isValid = true;

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <CustomInput
        label={t("stepOneFirstNameLabel")}
        name="firstName"
        value={formData.firstName}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
          if (errors.firstName) setErrors({ ...errors, firstName: "" });
        }}
        placeholder={t("stepOneFirstNamePlaceholder")}
        error={errors.firstName}
      />
      <CustomInput
        label={t("stepOneLastNameLabel")}
        name="lastName"
        value={formData.lastName}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
          if (errors.lastName) setErrors({ ...errors, lastName: "" });
        }}
        placeholder={t("stepOneLastNamePlaceholder")}
        error={errors.lastName}
      />
      <CustomInput
        label={t("stepOneEmailLabel")}
        name="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        placeholder={t("stepOneEmailPlaceholder")}
        error={errors.email}
      />
      <CustomInput
        label={t("stepOnePasswordLabel")}
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        placeholder={t("stepOnePasswordPlaceholder")}
        error={errors.password}
      />

      <button
        onClick={handleNext}
        type="button"
        className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
      >
        {t("stepOneNextButton")}
      </button>
      <p
        onClick={() => setPage("Login")}
        className="text-center text-sm text-gray-600 cursor-pointer"
      >
        {t("stepOneAlreadyUserText")}{" "}
        <a className="text-blue-500 hover:underline font-medium">
          {t("stepOneSignInLink")}
        </a>
      </p>
    </div>
  );
};

export default StepOne;
