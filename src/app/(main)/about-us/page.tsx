"use client";
import DonorAbout from "@/components/donate/donor-about";
import DonorStats from "@/components/donate/donor-stats";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import Entrance from "@/components/Card/images/entrance.png";
import Intrance from "@/components/Card/images/interance.png";
import Restroom from "@/components/Card/images/restroom.png";
import { getColor } from "@/components/Card";

const faq = [
  {
    question: "What is the AXS Mapathon?",
    answer:
      "The AXS Mapathon is an initiative to create a comprehensive map of the AXS campus, providing information on accessibility, facilities, and services. The mapathon aims to make the AXS campus more accessible to everyone, including those with disabilities.",
  },
  {
    question: "What is the purpose of the AXS Mapathon?",
    answer:
      "The purpose of the AXS Mapathon is to create a comprehensive map of the AXS campus, providing information on accessibility, facilities, and services. The mapathon aims to make the AXS campus more accessible to everyone, including those with disabilities.",
  },
  {
    question: "What is the AXS Mapathon?",
    answer:
      "The AXS Mapathon is an initiative to create a comprehensive map of the AXS campus, providing information on accessibility, facilities, and services. The mapathon aims to make the AXS campus more accessible to everyone, including those with disabilities.",
  },
];

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {/* Welcome / Hero Section */}
      <div className="w-full bg-[#363537] py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {t("infoModalWelcomeTitle")}
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {t("infoModalWelcomeDescription")}
        </p>
      </div>

      {/* Video Section */}
      <div className="w-full flex justify-center py-10 px-4">
        <iframe
          src="https://www.youtube.com/embed/mv7K7xifXyM?si=wczkZA8i0TErjj4w&rel=0&modestbranding=1&playsinline=1"
          title="AXS Map: Join the Mapathon Today"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full max-w-[800px] aspect-video rounded-lg"
        />
      </div>

      {/* Stats Bar */}
      <div className="w-full flex justify-center py-10 px-4">
        <DonorStats />
      </div>

      {/* Mapathon FAQ Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Mapathon
        </h2>
        <div className="space-y-6">
          {faq.map((item, index) => (
            <div key={index}>
              <p className="text-base font-bold text-black">{item.question}</p>
              <p className="text-base text-gray-700 mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rating System Section */}
      <div className="w-full bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {t("infoModalRatingSystemTitle")}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {t("infoModalRatingSystemDescription")}
          </p>

          {/* Venue Phases */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h3 className="text-center text-lg font-semibold mb-4">
              {t("infoModalVenuePhasesTitle")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Image
                  src={Entrance}
                  alt={t("infoModalEntranceAlt")}
                  width={40}
                  height={40}
                  className="filter-tint-black"
                />
                <span className="mt-2 text-sm text-black font-medium">
                  {t("infoModalEntranceLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Intrance}
                  alt={t("infoModalInteriorAlt")}
                  width={70}
                  height={70}
                  className="filter-tint-black"
                />
                <span className="mt-2 text-sm text-black font-medium">
                  {t("infoModalInteriorLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Restroom}
                  alt={t("infoModalRestroomAlt")}
                  width={40}
                  height={40}
                  className="filter-tint-black"
                />
                <span className="mt-2 text-sm text-black font-medium">
                  {t("infoModalRestroomLabel")}
                </span>
              </div>
            </div>
          </div>

          {/* Color System */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h3 className="text-center text-lg font-semibold mb-4">
              {t("infoModalColorSystemTitle")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#009A01] rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalAccessibleLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FEE000] rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalCautionLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FF5602] rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalAlertLabel")}
                </span>
              </div>
            </div>
          </div>

          {/* Fully Accessible Example */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-center text-lg font-bold text-gray-800 mb-4">
              {t("infoModalFullyAccessibleTitle")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "cardEntranceLabel",
                  image: Entrance,
                  background: getColor(5)?.background,
                  tint: getColor(5)?.tint,
                },
                {
                  label: "cardInteriorLabel",
                  image: Intrance,
                  background: getColor(5)?.background,
                  tint: getColor(5)?.tint,
                },
                {
                  label: "cardRestroomLabel",
                  image: Restroom,
                  background: getColor(5)?.background,
                  tint: getColor(5)?.tint,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <div
                    style={{ backgroundColor: item?.background }}
                    className="w-[80px] border-gray-300 py-3 rounded-[5px] flex items-center justify-center"
                  >
                    <Image
                      src={item?.image}
                      alt={item.label}
                      className={`object-contain h-[28px] w-[${index === 1 ? "40px" : "30px"}] ${item.tint}`}
                    />
                  </div>
                  <p className="text-[#363537] mt-1 text-[11px] font-bold">
                    {t(item?.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="w-full py-10">
        <DonorAbout />
      </div>
    </div>
  );
}
