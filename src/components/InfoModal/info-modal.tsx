"use-client";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import banner from "../../../public/main-banner.png";
import logo from "../../components/Header/images/logo.png";
import React from "react";
import Image from "next/image";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";
import EntranceIcon from "@/assets/icons/entrance-icon";
import IntranceIcon from "@/assets/icons/intrance-icon";
import RestroomIcon from "@/assets/icons/restroom-icon";
import { useTranslation } from "react-i18next";

const InfoModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-4/5 max-w-lg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          <CloseMenuIcon />
        </div>
        <div className="bg-[#2D2635] mt-8 flex flex items-center justify-center">
          <Image
            src={logo}
            alt={t("infoModalLogoAlt")}
            width={180}
            height={180}
          />
        </div>

        <Image
          src={banner}
          alt={t("infoModalBannerAlt")}
          width={800}
          height={800}
          className="mt-8"
        />

        <h2 className="flex flex items-center justify-center text-2xl font-bold mt-4">
          {t("infoModalWelcomeTitle")}
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          {t("infoModalWelcomeDescription")}
        </p>
        <h2 className="flex flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
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
                />
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalEntranceLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Intrance}
                  alt={t("infoModalInteriorAlt")}
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalInteriorLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Restroom}
                  alt={t("infoModalRestroomAlt")}
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-sm font-medium">
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
                <div className="w-10 h-10 bg-green-600 rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalAccessibleLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-yellow-400 rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalCautionLabel")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded"></div>
                <span className="mt-2 text-sm font-medium">
                  {t("infoModalAlertLabel")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="flex flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
          {t("infoModalFullyAccessibleTitle")}
        </h2>

        <div className="mt-6 grid grid-cols-3 ">
          <div className="flex flex-col items-center">
            <div className="bg-green-600 p-2 rounded">
              <IntranceIcon />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-600 p-2 rounded">
                <EntranceIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-600 p-2 rounded">
                <RestroomIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
