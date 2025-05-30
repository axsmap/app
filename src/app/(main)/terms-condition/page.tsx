"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container m-auto bg-gray-50 px-4 py-8 leading-relaxed">
      <h1 className="flex flex items-center justify-center text-3xl text-center font-semibold">
        {t("termsTitle")}
      </h1>
      <p className="mt-6 flex flex items-center justify-center text-center text-sm text-gray-500">
        {t("termsLastUpdated")}
      </p>
      <p className="flex flex items-center justify-center mt-4">
        {t("termsIntro")}

      </p>
      <p className="mt-4">{t("termsDescription1")}</p> 
      <p className="mt-4">{t("termsDescription2")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsDefinitionsTitle")}
      </h2>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsDefinitionsPartiesTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsDefinitionsPartiesDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsDefinitionsContentTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsDefinitionsContentDescription")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsChangesTitle")}
      </h2>
      <p className="mt-6 text-center">{t("termsChangesDescription")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsUsingSiteTitle")}
      </h2>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsEligibilityTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsEligibilityDescription1")}</p>
      <p className="mt-6 text-center">{t("termsEligibilityDescription2")}</p>
      <h5 className="flex flex items-center justify-center mt-6 text-md font-bold">
        {t("termsUsersUnder18Title")}
      </h5>
      <p className="mt-6 text-center">{t("termsUsersUnder18Description1")}</p>
      <p className="mt-6 text-center">{t("termsUsersUnder18Description2")}</p>
      <p className="mt-6 text-center">{t("termsUsersUnder18Description3")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsPermissionTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsPermissionDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsSiteAvailabilityTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsSiteAvailabilityDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsUserAccountsTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsUserAccountsDescription1")}</p>
      <p className="mt-6 text-center">{t("termsUserAccountsDescription2")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsCommunicationsTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsCommunicationsDescription")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsContentTitle")}
      </h2>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsResponsibilityTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsResponsibilityDescription1")}</p>
      <p className="mt-4 text-center">{t("termsResponsibilityDescription2")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsOurRightTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsOurRightDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsOwnershipTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsOwnershipDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsAdvertisingTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsAdvertisingDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsMapathonsTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsMapathonsDescription1")}</p>
      <p className="mt-6 text-center">{t("termsMapathonsDescription2")}</p>
      <p className="mt-6 text-center">{t("termsMapathonsDescription3")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsPersonalInfoTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsPersonalInfoDescription")}</p>
      <h3 className="flex flex items-center justify-center mt-6 text-lg font-semibold">
        {t("termsOtherTitle")}
      </h3>
      <p className="mt-6 text-center">{t("termsOtherDescription")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsRestrictionsTitle")}
      </h2>
      <p className="mt-6 text-center">{t("termsRestrictionsDescription")}</p>
      <h2 className="flex flex items-center justify-center mt-8 text-xl font-semibold">
        {t("termsQuestionsTitle")}
      </h2>
      <p className="mt-6 text-center">{t("termsQuestionsDescription")}</p>
    </div>
  );
};

export default TermsAndConditions;
