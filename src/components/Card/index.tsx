import Image from "next/image";
import React, { FC } from "react";
import Entrance from "../Card/images/entrance.svg";
import Intrance from "../Card/images/interior.svg";
import Restroom from "../Card/images/restroom.svg";
import { useTranslation } from "react-i18next";

interface CardProps {
  imageSrc?: any;
  selectedVenue?: any;
  isSelectedVenue?: boolean;
  title: string;
  description: string;
  distance?: string;
  buttonText: string;
  onButtonClick: () => void;
  // onCloseClick?: () => void;
}

const CardComponent: FC<CardProps> = ({
  imageSrc,
  title,
  description,
  isSelectedVenue,
  selectedVenue,
  distance,
  buttonText,
  // onCloseClick,
  onButtonClick,
}) => {
  const { t } = useTranslation();
  const getColor = (score: number) => {
    if (score === 1) {
      return "red";
    }
    if (score > 1 && score < 3) {
      return "yellow";
    }
    if (score > 3) {
      return "green";
    }
    return "#ccc";
  };

  const renderScoreIcon = (
    iconSrc: any,
    label: string,
    score: number,
    alt: string,
    width: number,
    height: number
  ) => (
    <div className="flex flex-col items-center">
      <div
        className="p-2 rounded flex items-center justify-center mb-1"
        style={{
          backgroundColor: getColor(score),
          width: 50,
          height: 50,
        }}
      >
        <Image src={iconSrc} alt={alt} width={width} height={height} />
      </div>
      <p className="text-xs text-center">{label}</p>
    </div>
  );

  return (
    <div>
      {!isSelectedVenue ? (
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2 w-full flex flex-col items-start justify-start">
              <h4 className="text-sm font-semibold text-[#363537] mb-1">
                {title}
              </h4>
              <h5 className="text-sm font-medium text-[#363537] mb-2">
                {distance}
              </h5>

              <div className="w-full h-[100px] flex items-center justify-center">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={title}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <p className="text-center text-xs text-gray-400">
                    {t("cardNoImageAvailable")}
                  </p>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="sm:w-1/2 w-full bg-white border shadow-sm rounded p-4 flex flex-col justify-between">
              <div className="flex justify-center gap-6">
                {renderScoreIcon(
                  Entrance,
                  t("cardEntranceLabel"),
                  selectedVenue?.entranceScore,
                  "Entrance",
                  23,
                  26
                )}
                {renderScoreIcon(
                  Intrance,
                  t("cardInteriorLabel"),
                  selectedVenue?.interiorScore,
                  "Interior",
                  46,
                  49
                )}
                {renderScoreIcon(
                  Restroom,
                  t("cardRestroomLabel"),
                  selectedVenue?.restroomScore,
                  "Restroom",
                  23,
                  26
                )}
              </div>

              <p className="text-sm text-center text-gray-500 mb-1">
                {description}
              </p>

              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded text-sm"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-2 flex flex-col items-start justify-center">
          <h4 className="text-sm font-semibold text-[#363537] mb-2">{title}</h4>
          <div className="flex mb-2 justify-center gap-6">
            {renderScoreIcon(
              Entrance,
              t("cardEntranceLabel"),
              selectedVenue?.entranceScore,
              "Entrance",
              23,
              26
            )}
            {renderScoreIcon(
              Intrance,
              t("cardInteriorLabel"),
              selectedVenue?.interiorScore,
              "Interior",
              46,
              49
            )}
            {renderScoreIcon(
              Restroom,
              t("cardRestroomLabel"),
              selectedVenue?.restroomScore,
              "Restroom",
              23,
              26
            )}
          </div>

          <p className="text-sm text-center text-gray-500 mb-2">
            {description}
          </p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded text-sm"
            onClick={onButtonClick}
          >
            {t("cardAddReviewButton")}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
