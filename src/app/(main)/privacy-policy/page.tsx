"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <main className="container mx-auto bg-gray-50 p-6">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="mt-2">{t("lastUpdated")}</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t("generalTitle")}</h2>
          <p className="text-base leading-relaxed">{t("generalDescription")}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("personalInfoTitle")}</h2>

          <h3 className="text-lg font-bold mb-2">{t("registerTitle")}</h3>
          <p className="text-base leading-relaxed">
            {t("registerDescription")}
          </p>
          <ul className="list-disc pl-6 mt-4">
            {t("registerList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          <p className="mt-4 text-base leading-relaxed">{t("registerNote")}</p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2">{t("communicateTitle")}</h3>
          <p className="text-base leading-relaxed">
            {t("communicateDescription")}
          </p>
          <ul className="list-disc pl-6 mt-4">
            {t("communicateList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          <p className="mt-4 text-base leading-relaxed ">
            {t("communicateNote")}
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2">{t("requestInfoTitle")}</h3>
          <p className="text-base leading-relaxed">
            {t("requestInfoDescription")}
          </p>
          <ul className="list-disc pl-6 mt-4">
            {t("requestInfoList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            {t("requestInfoNote")}
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2">{t("surveysTitle")}</h3>
          <p className="text-base leading-relaxed">{t("surveysDescription")}</p>
          <ul className="list-disc pl-6 mt-4">
            {t("surveysList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          <p className="mt-4 text-base leading-relaxed">
            {t("surveysNote")}
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2">
            {t("internetActivityTitle")}
          </h3>
          <p className="text-base leading-relaxed">
            {t("internetActivityDescription")}
          </p>
          <ul className="list-disc pl-6 mt-4">
            {t("internetActivityList", {
              returnObjects: true,
            }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4">
          <p className="text-base leading-relaxed">
            {t("internetActivityGoogleAnalytics")}
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-bold mb-2">
            {t("locationInfoTitle")}
          </h3>
          <p className="text-base leading-relaxed">
            {t("locationInfoDescription")}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t("sourcesTitle")}</h2>
          <p className="text-base leading-relaxed">{t("sourcesDescription")}</p>
          <ul className="list-disc pl-6 mt-4">
            {t("sourcesList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t("purposesTitle")}</h2>
          <p className="text-base leading-relaxed">
            {t("purposesDescription")}
          </p>
          <ul className="list-disc pl-6 mt-4">
            {t("purposesList", { returnObjects: true }).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t("discloseTitle")}</h2>
          <p className="text-base leading-relaxed">
            {t("discloseDescription")}
          </p>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  {t("discloseTableHeaders.categoryOfInfo")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  {t("discloseTableHeaders.categoryOfThirdParty")}
                </th>
              </tr>
            </thead>
            <tbody>
              {t("discloseTableRows", {
                returnObjects: true,
              }).map((row: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b">
                    <ul className="list-disc pl-6">
                      {row.personalInfo.map((info: string, idx: number) => (
                        <li key={idx}>{info}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <ul className="list-disc pl-6">
                      {row.thirdParty.map((party: string, idx: number) => (
                        <li key={idx}>{party}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {t("californiaRightsTitle")}
          </h2>
          <p className="text-base leading-relaxed">
            {t("californiaRightsIntro")}{" "}
            <a
              href={`mailto:${t("californiaRightsEmail")}`}
              className="text-blue-500"
            >
              {t("californiaRightsEmail")}
            </a>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("dataRetentionTitle")}</h2>
          <p className="text-base leading-relaxed">
            {t("dataRetentionDescription")}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("linksTitle")}</h2>
          <p className="text-base leading-relaxed">{t("linksDescription")}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("childrenTitle")}</h2>
          <p className="text-base leading-relaxed">
            {t("childrenDescription")}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("cookiesTitle")}</h2>
          <p className="text-base leading-relaxed">{t("cookiesDescription")}</p>
          <p className="mt-4 text-base leading-relaxed">{t("cookiesIntro")}</p>
          <table className="mt-4 min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  {t("cookiesTableHeaders.type")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  {t("cookiesTableHeaders.description")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  {t("cookiesTableHeaders.managingSettings")}
                </th>
              </tr>
            </thead>
            <tbody>
              {t("cookiesTableRows", { returnObjects: true }).map(
                (row: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border-b">{row.type}</td>
                    <td className="px-6 py-4 border-b">{row.description}</td>
                    <td className="px-6 py-4 border-b">
                      {typeof row.managingSettings === "object" ? (
                        <p className="text-base leading-relaxed">
                          {row.managingSettings.browserText}{" "}
                          <a
                            href="https://www.aboutcookies.org/"
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.managingSettings.browserLinkText}
                          </a>
                          . {row.managingSettings.flashText}{" "}
                          <a
                            href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager.html"
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.managingSettings.flashLinkText}
                          </a>
                          .
                        </p>
                      ) : (
                        row.managingSettings
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("securityTitle")}</h2>
          <p className="text-base leading-relaxed">
            {t("securityDescription")}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("changesTitle")}</h2>
          <p className="text-base leading-relaxed">{t("changesDescription")}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">{t("dntTitle")}</h2>
          <p className="text-base leading-relaxed">{t("dntDescription")}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {t("PrivacyPolicyContactUsTitle")}
          </h2>
          <p className="text-base leading-relaxed">
            {t("contactUsDescription")}{" "}
            <a href={`mailto:${t("contactUsEmail")}`} className="text-blue-500">
              {t("contactUsEmail")}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
