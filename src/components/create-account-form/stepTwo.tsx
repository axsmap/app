import React from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { FormData } from "./create-account-form";
import { AuthModalScreenProps } from "@/utils/types";
import { useTranslation } from "react-i18next";
import CustomSelect from "../ui/custom-select/custom-select";
import { disability, genders, races } from "@/utils/helpersValues";
import CustomDateRangePicker from "../ui/custom-date-range-picker/custom-date-range-picker";
import { DatePicker } from "../ui/DatePicker";

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
        options={disability}
        onChange={(e) =>
          setFormData({ ...formData, disability: e.target.value })
        }
      />

      <CustomSelect
        name="race"
        label={"Race/Ethnicity"}
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
          className="w-full border border-gray-300 py-2 rounded-md"
        >
          {t("stepTwoBackButton")}
        </button>
        <button
          onClick={onNext}
          className="w-full bg-primary text-black font-medium py-2 rounded-md  transition"
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
