import Image from "next/image";
import React, { FC } from "react";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";
import { useTranslation } from "react-i18next";

interface CardProps {
  imageSrc?: any;
  selectedVenue?: any;
  isSelectedVenue?: boolean;
  title: string;
  description: string;
  distance: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CardComponent: FC<CardProps> = ({
  imageSrc,
  title,
  description,
  isSelectedVenue,
  selectedVenue,
  distance,
  buttonText,
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

    if (score > 0 && score < 1) {
      return "red";
    }
    return undefined;
  };

  return (
    <>
      {!isSelectedVenue && (
       <div className="bg-white rounded-xs h-full shadow-md">
          <div className="w-full flex flex-col px-4 pb-8">
            <h4 className="text-sm font-[600] bg-color[#363537] mb-1 pt-3">
              {title}
            </h4>
            <h5 className="text-sm font-[500] bg-color[#363537]">{distance}</h5>
          </div>
          <div className="flex  rounded-xs ">
            <div className="w-[70px] h-auto overflow-hidden bg-gray-100">
              {imageSrc ? (
                <Image
                  src={imageSrc || null}
                  width={100}
                  height={200}
                  alt={title}
                  className="!w-full !h-full object-cover"
                />
              ) : (
                <div className="card-placeholder text-sm ps-1 pt-2">
                  {t("cardNoImageAvailable")}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="bg-white border shadow-xs rounded-xs p-4 flex flex-col">
                <div className="flex mb-1">
                  <div
                    className="text-center text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0"
                    style={{ background: getColor(selectedVenue?.entranceScore) }}
                  >
                    <Image src={Entrance} alt="Entrance" width={23} height={26} />
                    {t("cardEntranceLabel")}
                  </div>
                  <div
                    className="text-[#363537] text-center text-[10px] rounded p-2 "
                    style={{ background: getColor(selectedVenue?.interiorScore) }}
                  >
                    <Image src={Intrance} alt="Interior" width={23} height={26} />
                    {t("cardInteriorLabel")}
                  </div>
                  <div
                    className="text-[#363537] text-center text-[10px] rounded font-normal leading-normal p-2"
                    style={{ background: getColor(selectedVenue?.restroomScore) }}
                  >
                    <Image src={Restroom} alt="Restroom" width={23} height={26} />
                    {t("cardRestroomLabel")}
                  </div>
                </div>
                <p className="text-sm mb-2 text-[#787879] text-[12px]">
                  {description}
                </p>
                <button className="btn-primary py-2 px-4 text-sm" onClick={onButtonClick}>
                  {buttonText}
                </button>
              </div>

            </div>
          </div>


        </div>
      )}

      {isSelectedVenue && (
        <>
          <h4 className="mb-4 text-sm font-semibold text-[#363537]">{title}</h4>
          <div className="mb-4 flex gap-4 w-full">
            <div
              style={{
                backgroundColor: getColor(selectedVenue?.entranceScore),
              }}
              className="flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0 w-auto"
            >
              <Image src={Entrance} alt="Entrance" width={23} height={26} />
              {t("cardEntranceLabel")}
            </div>
            <div
              className={`flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0 w-auto ${getColor(
                selectedVenue?.interiorScore
              )}`}
            >
              <Image src={Intrance} alt="Interior" width={23} height={26} />
              {t("cardInteriorLabel")}
            </div>
            <div
              className={`flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0 w-auto ${getColor(
                selectedVenue?.restroomScore
              )}`}
            >
              <Image src={Restroom} alt="Restroom" width={23} height={26} />
              {t("cardRestroomLabel")}
            </div>
          </div>

          <p className="mb-4 text-[#787879] text-[12px]">
            {selectedVenue?.isReviewed ? null : t("cardNoRatingsMessage")}
          </p>

          <button
            className="mb-4 flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            onClick={onButtonClick}
          >
            {t("cardAddReviewButton")}
          </button>
        </>
      )}
    </>
  );
};

export default CardComponent;
