"use-client";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import Image from "next/image";
import React from "react";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";

import { useTranslation } from "react-i18next";
import { getColor } from "../Card";
interface props {
  isOpen: boolean;
  onClose: () => void;
}

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

const InfoModal: React.FC<props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-tr-lg rounded-tl-lg sm:w-[90vw] md:w-[70vw] lg:w-[50vw] relative h-[100%] md:h-[100vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          <CloseMenuIcon />
        </div>
        <h2 className="flex items-center justify-center text-2xl font-bold mt-4">
          {t("infoModalWelcomeTitle")}
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          {t("infoModalWelcomeDescription")}
        </p>

        <div className="flex justify-center mb-8 mt-3 ">
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

        <h2 className="flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
          Mapathon
        </h2>
        <div className="space-y-4 mt-3">
          {faq.map((item, index) => (
            <div key={index}>
              <p className="text-base font-bold text-black">{item?.question}</p>
              <p className="text-base text-black">{item?.answer}</p>
            </div>
          ))}
        </div>
        <h2 className="flex items-center justify-center text-xl font-bold mt-5 text-gray-800">
          {t("infoModalRatingSystemTitle")}
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          {t("infoModalRatingSystemDescription")}
        </p>
        <div className="mt-6 bg-gray-100 rounded-md">
          <div className="p-2 rounded-md">
            <h3 className="text-center text-lg font-semibold mb-4">
              {t("infoModalVenuePhasesTitle")}
            </h3>
            <div className="grid grid-cols-3 ">
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
                  className="filter-tint-black"
                  height={40}
                />
                <span className="mt-2 text-sm text-black font-medium">
                  {t("infoModalRestroomLabel")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md mt-4">
            <h3 className="text-center text-lg font-semibold mb-4">
              {t("infoModalColorSystemTitle")}
            </h3>
            <div className="grid grid-cols-3">
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
        </div>

        <h2 className="flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
          {t("infoModalFullyAccessibleTitle")}
        </h2>

        <div className="grid grid-cols-3 mt-6 gap-x-1 w-[100%]">
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
              className="flex flex-col justify-center items-center  leading-normal "
            >
              <div
                style={{
                  backgroundColor: item?.background,
                }}
                className={`w-[80px] border-gray-300 py-3 rounded-[5px] flex  items-center justify-center`}
              >
                <Image
                  src={item?.image}
                  alt={item.label}
                  className={`object-contain h-[28px] w-[${index ===1 ? '40px' : '30px'}]  ${item.tint}`}
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
  );
};

export default InfoModal;
