import React from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { FormData } from "./create-account-form";
import { AuthModalScreenProps } from "@/utils/types";
import { useTranslation } from "react-i18next";
import CustomSelect from "../ui/custom-select/custom-select";

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
      <CustomSelect
        label={t("stepTwoDisabilityLabel")}
        name="disability"
        value={formData.disability}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "No" },
          {
            label: "Not-to-say",
            value: "not-to-say",
          },
        ]}
        onChange={(e) =>
          setFormData({ ...formData, disability: e.target.value })
        }
      />

      <CustomSelect
        name="race"
        label={t("stepTwoRaceLabel")}
        value={formData.race}
        options={[
          { label: "Black/African American", value: "black/african american" },
          { label: "caucasian", value: "caucasian" },
          {
            label: "Indigenous/first Nation/native american",
            value: "indigenous/first nation/native american",
          },
          {
            label: "Latino/Hispanic",
            value: "atino/hispanic",
          },
          {
            label: "Middle Eastern/North African",
            value: "middle eastern/north african",
          },
          {
            label: "Native Hawaiian/Pacific Islander",
            value: "native hawaiian/pacific islander",
          },
          { label: "Biracial/multiracial", value: "Biracial/multiracial" },
          { label: "Asian", value: "asian" },
          { label: "Non-naucasian", value: "non-naucasian" },
          { label: "Not-to-disclose", value: "not-to-disclose" },
        ]}
        onChange={(e) => setFormData({ ...formData, race: e.target.value })}
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
