import React from "react";
import { ReactivateFormData } from "./reactivate-account-form";
import CustomInput from "../ui/custom-input/custom-input";
import { useTranslation } from "react-i18next";

interface StepThreeProps {
  onBack: () => void;
  formData: ReactivateFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReactivateFormData>>;
}

const StepThree: React.FC<StepThreeProps> = ({
  onBack,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-sm text-blue-800">
          {t("reactivateAccount.finalStepNote")}
        </p>
      </div>

      <div>
        <CustomInput
          name="aboutMe"
          label={t("stepThreeDescriptionLabel")}
          value={formData.aboutMe}
          multiline
          onChange={(e) =>
            setFormData({ ...formData, aboutMe: e.target.value })
          }
          placeholder={t("stepThreeDescriptionPlaceholder")}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={formData.isSubscribed}
          onChange={(e) =>
            setFormData({ ...formData, isSubscribed: e.target.checked })
          }
          className="accent-yellow-400"
        />
        {t("stepThreeNewsletterLabel")}
      </label>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          type="button"
          className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        >
          {t("back")}
        </button>
        <button 
          type="submit"
          className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition"
        >
          {t("reactivateAccount.reactivateButton")}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
