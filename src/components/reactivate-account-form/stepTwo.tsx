import React, { useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { ReactivateFormData } from "./reactivate-account-form";
import { useTranslation } from "react-i18next";
import CustomSelect from "../ui/custom-select/custom-select";
import { disability, genders, races } from "@/utils/helpersValues";
import { DatePicker } from "../ui/DatePicker";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
  formData: ReactivateFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReactivateFormData>>;
}

const StepTwo: React.FC<StepTwoProps> = ({
  onNext,
  onBack,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };
    let isValid = true;

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("reactivateAccount.errors.firstNameRequired");
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("reactivateAccount.errors.lastNameRequired");
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = t("reactivateAccount.errors.emailRequired");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("reactivateAccount.errors.emailInvalid");
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
          {t("reactivateAccount.personalInfoNote")}
        </p>
      </div>

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
        type="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        placeholder={t("stepOneEmailPlaceholder")}
        error={errors.email}
      />

      <CustomSelect
        label={t("stepTwoDisabilityLabel")}
        name="disability"
        value={formData.disability}
        options={disability}
        onChange={(e) =>
          setFormData({ ...formData, disability: e.target.value })
        }
      />

      <CustomSelect
        name="race"
        label={t("stepTwoRaceLabel")}
        value={formData.race}
        options={races}
        onChange={(e) => setFormData({ ...formData, race: e.target.value })}
      />

      <CustomSelect
        name="gender"
        label={"Gender"}
        options={genders}
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      />

      <DatePicker
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(e) => setFormData({ ...formData, dateOfBirth: e })}
      />

      <div className="flex gap-4">
        <button
          onClick={onBack}
          type="button"
          className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        >
          {t("back")}
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="w-full bg-primary text-black font-medium py-2 rounded-md transition"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
