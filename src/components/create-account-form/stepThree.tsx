import AppleIcon from "@/assets/icons/apple-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import React from "react";
import { FormData } from "./create-account-form";
import CustomInput from "../ui/custom-input/custom-input";
import { AuthModalScreenProps } from "@/utils/types";
import { useTranslation } from "react-i18next";

interface StepThreeProps extends AuthModalScreenProps {
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const StepThree: React.FC<StepThreeProps> = ({
  onBack,
  formData,
  setFormData,
  setPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
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
          className="w-full border border-gray-300 py-2 rounded-md"
        >
          {t("stepThreeBackButton")}
        </button>
        <button className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition">
          {'Submit'}
        </button>
      </div>

      {/* <div className="text-sm text-center text-gray-500">
        {t("stepThreeOrCreateWithText")}
      </div> */}
      {/* <div className="flex gap-4">
        <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2">
          <GoogleIcon />
          {t("stepThreeGoogleButton")}
        </button>
        <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2">
          <AppleIcon />
          {t("stepThreeAppleButton")}
        </button>
      </div> */}

      <p
        onClick={() => setPage("Login")}
        className="text-center text-sm text-gray-600"
      >
        {t("stepThreeAlreadyUserText")}{" "}
        <a className="text-blue-500 hover:underline font-medium">
          {t("stepThreeSignInLink")}
        </a>
      </p>
    </div>
  );
};

export default StepThree;
