import React from "react";
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

  return (
    <div className="space-y-4">
      <CustomInput
        label={t("stepOneFirstNameLabel")}
        name="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder={t("stepOneFirstNamePlaceholder")}
      />
      <CustomInput
        label={t("stepOneLastNameLabel")}
        name="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder={t("stepOneLastNamePlaceholder")}
      />
      <CustomInput
        label={t("stepOneEmailLabel")}
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder={t("stepOneEmailPlaceholder")}
      />
      <CustomInput
        label={t("stepOnePasswordLabel")}
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder={t("stepOnePasswordPlaceholder")}
      />

      <button
        onClick={onNext}
        className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
      >
        {t("stepOneNextButton")}
      </button>
      <p
        onClick={() => setPage("Login")}
        className="text-center text-sm text-gray-600"
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
