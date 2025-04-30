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
  console.log({ selectedVenue });
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
        <div className="flex flex-col sm:flex-row bg-gray-100 p-4 rounded-xs gap-4">
          <div className="w-full sm:w-2/4 flex flex-col">
            <h4 className="text-sm font-[500] bg-color[#363537] mb-1">
              {title}
            </h4>
            <h5 className="text-sm font-[500] bg-color[#363537]">{distance}</h5>
            {imageSrc ? (
              <Image
                src={imageSrc || null}
                width={600}
                height={600}
                alt={title}
              />
            ) : (
              <div className="card-placeholder">
                {t("cardNoImageAvailable")}
              </div>
            )}
          </div>
          <div className="w-full sm:w-1/2 bg-white border shadow-xs rounded-xs p-4 flex flex-col">
            <div className="flex justify-center gap-8 mb-1">
              <div className="flex flex-col items-center">
                <div
                  className="text-center text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0"
                  style={{ background: getColor(selectedVenue?.entranceScore) }}
                >
                  <Image src={Entrance} alt="Entrance" width={23} height={26} />
                </div>
                <p>{t("cardEntranceLabel")}</p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="text-[#363537] text-center text-[10px] rounded font-normal leading-normal p-2"
                  style={{ background: getColor(selectedVenue?.interiorScore) }}
                >
                  <Image src={Intrance} alt="Intrance" width={46} height={49} />
                </div>
                <p>{t("cardInteriorLabel")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="text-[#363537] text-center text-[10px] rounded font-normal leading-normal p-2"
                  style={{ background: getColor(selectedVenue?.restroomScore) }}
                >
                  <Image src={Restroom} alt="Restroom" width={23} height={26} />
                </div>
                <p>{t("cardRestroomLabel")}</p>
              </div>
            </div>

            <p className="text-sm mb-2 text-[#787879] text-center text-[12px]">
              {description}
            </p>
            <button className="btn-primary py-2 px-4" onClick={onButtonClick}>
              {buttonText}
            </button>
          </div>
        </div>
      )}

      {isSelectedVenue && (
        <>
          <h4 className="mb-4 text-sm font-semibold text-[#363537]">{title}</h4>
          <div className="flex justify-center gap-8 mb-1">
            <div className="flex flex-col items-center">
              <div
                className="text-center text-[10px] font-normal leading-normal p-2 rounded flex-shrink-0"
                style={{ background: getColor(selectedVenue?.entranceScore) }}
              >
                <Image src={Entrance} alt="Entrance" width={23} height={26} />
              </div>
              <p>{t("cardEntranceLabel")}</p>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="text-[#363537] text-center text-[10px] rounded font-normal leading-normal p-2"
                style={{ background: getColor(selectedVenue?.interiorScore) }}
              >
                <Image src={Intrance} alt="Intrance" width={46} height={49} />
              </div>
              <p>{t("cardInteriorLabel")}</p>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="text-[#363537] text-center text-[10px] rounded font-normal leading-normal p-2"
                style={{ background: getColor(selectedVenue?.restroomScore) }}
              >
                <Image src={Restroom} alt="Restroom" width={23} height={26} />
              </div>
              <p>{t("cardRestroomLabel")}</p>
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
