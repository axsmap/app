import React, { useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { ReactivateFormData } from "./reactivate-account-form";
import { useTranslation } from "react-i18next";

interface StepOneProps {
  onNext: () => void;
  formData: ReactivateFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReactivateFormData>>;
}

const StepOne: React.FC<StepOneProps> = ({
  onNext,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Validate password
    if (!formData.password) {
      newErrors.password = t("reactivateAccount.errors.passwordRequired");
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t("reactivateAccount.errors.passwordTooShort");
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("reactivateAccount.errors.passwordRequired");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("reactivateAccount.errors.passwordMismatch");
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
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-sm text-blue-800">
          {t("reactivateAccount.passwordResetInfo")}
        </p>
      </div>

      <CustomInput
        label={t("reactivateAccount.password")}
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        placeholder={t("reactivateAccount.passwordPlaceholder")}
        error={errors.password}
      />

      <CustomInput
        label={t("reactivateAccount.confirmPassword")}
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData({ ...formData, confirmPassword: e.target.value });
          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
        }}
        placeholder={t("reactivateAccount.confirmPasswordPlaceholder")}
        error={errors.confirmPassword}
      />

      <button
        onClick={handleNext}
        type="button"
        className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default StepOne;
