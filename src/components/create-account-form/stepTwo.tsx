import React from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { FormData } from "./create-account-form";
import { AuthModalScreenProps } from "@/utils/types";
import { useTranslation } from "react-i18next";

interface StepTwoProps extends AuthModalScreenProps {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepTwo: React.FC<StepTwoProps> = ({
  onNext,
  onBack,
  formData,
  setFormData,
  setPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <CustomInput
        label={t("stepTwoDisabilityLabel")}
        name="disability"
        value={formData.disability}
        onChange={(e) =>
          setFormData({ ...formData, disability: e.target.value })
        }
        placeholder={t("stepTwoDisabilityPlaceholder")}
      />
      <CustomInput
        label={t("stepTwoRaceLabel")}
        name="race"
        value={formData.race}
        onChange={(e) => setFormData({ ...formData, race: e.target.value })}
        placeholder={t("stepTwoRacePlaceholder")}
      />
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full border border-gray-300 py-2 rounded-md"
        >
          {t("stepTwoBackButton")}
        </button>
        <button
          onClick={onNext}
          className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
        >
          {t("stepTwoNextButton")}
        </button>
      </div>
      <p
        onClick={() => setPage("Login")}
        className="text-center text-sm text-gray-600"
      >
        {t("stepTwoAlreadyUserText")}{" "}
        <a className="text-blue-500 hover:underline font-medium">
          {t("stepTwoSignInLink")}
        </a>
      </p>
    </div>
  );
};

export default StepTwo;
