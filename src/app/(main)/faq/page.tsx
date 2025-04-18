import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-6">
      <h4 className="flex flex items-center justify-center mt-2">
        {t("faqTitle")}
      </h4>
      <div className="flex justify-center mb-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7iUUeLaiUBE?rel=0"
          title={t("faqVideoTitle")}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-6">
        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqHowToRateVenueTitle")}</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="mt-6 flex flex items-center justify-center">
            {t("faqHowToRateVenueDescription")}
          </p>
          <div className="mt-6 flex flex items-center justify-center">
            <ul className="list-disc pl-6">
              <li>{t("faqHowToRateVenueEntrance")}</li>
              <li>{t("faqHowToRateVenueInterior")}</li>
              <li>{t("faqHowToRateVenueRestroom")}</li>
              <li>{t("faqHowToRateVenueOther")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqAddPlaceTitle")}</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center">
            {t("faqAddPlaceDescription")}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqNeighborhoodTitle")}</strong>
        </div>
        <div className="text-base text-gray-600 mb-6">
          <p className="flex flex items-center justify-center">
            {t("faqNeighborhoodDescription")}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqReviewPlacesTitle")}</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center">
            {t("faqReviewPlacesDescription")}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqRegistrationTitle")}</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <p className="flex flex items-center justify-center">
            {t("faqRegistrationDescription")}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-800 mb-2">
          <strong>{t("faqFindPlaceTitle")}</strong>
        </div>
        <p className="mt-2 flex flex items-center justify-center">
          {t("faqFindPlaceIntro")}
        </p>
        <div className="text-base text-gray-800 mt-6">
          <p className="flex flex items-center justify-center">
            {t("faqFindPlaceSearchBoxes")}
          </p>
          <p className="mt-4 flex flex items-center justify-center">
            {t("faqFindPlaceSearchEverything")}
          </p>
          <p className="mt-4 flex flex items-center justify-center">
            {t("faqFindPlaceGoogleDatabase")}
          </p>
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-900 mt-4">
          <strong>{t("faqMapathonProcessTitle")}</strong>
        </div>
        <p className="mt-4 flex flex items-center justify-center">
          {t("faqMapathonAnimationPrompt")}
        </p>
        <div className="flex justify-center mt-8">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iERusV-vEIs?si=zBEMcpknaioY59uC"
            title={t("faqMapathonVideoTitle")}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex items-center justify-center text-lg font-medium text-gray-900 mt-4">
          <strong>{t("faqMapathonToolkitTitle")}</strong>
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>{t("faqToolkitPaperFormsTitle")}</strong>{" "}
          {t("faqToolkitPaperFormsDescription")}
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>{t("faqToolkitBrochureTitle")}</strong>{" "}
          {t("faqToolkitBrochureDescription")}
        </div>
        <div className="text-base text-gray-800 mb-4">
          <strong>{t("faqToolkitHowToRateTitle")}</strong>{" "}
          {t("faqToolkitHowToRateDescription")}
        </div>
        <p className="mt-4 flex flex items-center justify-center">
          {t("faqMapathonStepsIntro")}
        </p>
        <ol className="mt-8 list-decimal pl-6 space-y-2 text-gray-800">
          {t("faqMapathonSteps", { returnObjects: true }).map((step, index) => (
            <li key={index}>
              <span className="font-medium">{step.title}</span>{" "}
              {step.description}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Faq;
