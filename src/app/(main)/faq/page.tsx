"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();

  return (
    <div className="container m-auto bg-gray-50 px-4 sm:px-8 md:px-16 lg:px-24 pb-8 pt-5">
      <div className="flex justify-center mb-8">
        <iframe
          className="w-full max-w-[560px] aspect-video"
          src="https://www.youtube.com/embed/7iUUeLaiUBE?rel=0"
          title={t("faqVideoTitle")}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqHowToRateVenueTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqHowToRateVenueDescription")}
          </p>
          <ul className="list-disc pl-6 mt-3 text-base text-gray-800 space-y-1">
            <li>{t("faqHowToRateVenueEntrance")}</li>
            <li>{t("faqHowToRateVenueInterior")}</li>
            <li>{t("faqHowToRateVenueRestroom")}</li>
            <li>{t("faqHowToRateVenueOther")}</li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqAddPlaceTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqAddPlaceDescription")}
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqNeighborhoodTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqNeighborhoodDescription")}
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqReviewPlacesTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqReviewPlacesDescription")}
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqRegistrationTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqRegistrationDescription")}
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-2">
            {t("faqFindPlaceTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqFindPlaceIntro")}
          </p>
          <p className="text-base text-gray-800 mt-3">
            {t("faqFindPlaceSearchBoxes")}
          </p>
          <p className="text-base text-gray-800 mt-3">
            {t("faqFindPlaceSearchEverything")}
          </p>
          <p className="text-base text-gray-800 mt-3">
            {t("faqFindPlaceGoogleDatabase")}
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-900 mb-2">
            {t("faqMapathonProcessTitle")}
          </h5>
          <p className="text-base text-gray-800">
            {t("faqMapathonAnimationPrompt")}
          </p>
          <div className="flex justify-center mt-6">
            <iframe
              className="w-full max-w-[560px] aspect-video"
              src="https://www.youtube.com/embed/iERusV-vEIs?si=zBEMcpknaioY59uC"
              title={t("faqMapathonVideoTitle")}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-900 mb-2">
            {t("faqMapathonToolkitTitle")}
          </h5>
          <p className="text-base text-gray-800 mb-3">
            <strong>{t("faqToolkitPaperFormsTitle")}</strong>{" "}
            {t("faqToolkitPaperFormsDescription")}
          </p>
          <p className="text-base text-gray-800 mb-3">
            <strong>{t("faqToolkitBrochureTitle")}</strong>{" "}
            {t("faqToolkitBrochureDescription")}
          </p>
          <p className="text-base text-gray-800 mb-3">
            <strong>{t("faqToolkitHowToRateTitle")}</strong>{" "}
            {t("faqToolkitHowToRateDescription")}
          </p>
        </div>

        <div>
          <p className="text-base text-gray-800">
            {t("faqMapathonStepsIntro")}
          </p>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-base text-gray-800">
            {t("faqMapathonSteps", { returnObjects: true }).map((step, index) => (
              <li key={index}>
                <span className="font-medium">{step.title}</span>{" "}
                {step.description}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Faq;
