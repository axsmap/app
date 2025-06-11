import Image from "next/image";
import React, { FC } from "react";
import Entrance from "../Card/images/entrance.svg";
import Intrance from "../Card/images/interior.svg";
import Restroom from "../Card/images/restroom.svg";
import venuePlaceholder from "@/assets/icons/venuePlaceholder.png";
import { useTranslation } from "react-i18next";
import { venueInterface } from "@/Services/modules/mapathon/venue";
import { useRouter } from "next/navigation";
import { showCreateReview } from "../addReview/interface";

interface CardProps {
  imageSrc?: any;
  selectedVenue?: venueInterface;
  isSelectedVenue?: boolean;
  title: string;
  description: string;
  distance?: string;
  buttonText: string;
  onButtonClick: (name: string, id: string) => void;
}

export const getColor = (score: number) => {
  if (score === 0) return { background: "#ccc", tint: "filter-tint-gray" };
  if (score === 1) {
    return { background: "#FF5602", tint: "filter-tint-white" };
  }
  if (score > 1 && score < 3) {
    return { background: "#FEE000", tint: "filter-tint-black" };
  }
  if (score > 3) {
    return { background: "#009A01", tint: "filter-tint-white" };
  }
  return { background: "#ccc", tint: "filter-tint-gray" };
};

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
  const router = useRouter();
  const venueDetailsPage = (id: string) => {
    router.push(`/venue/${id}`);
  };

  return (
    <>
      {!isSelectedVenue && (
        <div className="bg-white rounded-xs rounded-[8px] h-full shadow-md">
          <div className="w-full flex flex-col px-4 pb-4">
            <p className="text-[16px] truncate font-[600] bg-color[#363537] mb-1 pt-3">
              {title}
            </p>
            <h5 className="text-[13px] font-[500] text-[#363537]">
              {distance}
            </h5>
          </div>
          <div className="flex rounded-xs ">
            <div
              onClick={() => venueDetailsPage(selectedVenue?.placeId ?? "")}
              className="w-[110px] h-auto overflow-hidden bg-gray-100"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc || null}
                  width={140}
                  height={200}
                  alt={title}
                  className="!w-full !h-full object-cover"
                />
              ) : (
                <Image
                  width={140}
                  height={200}
                  src={venuePlaceholder || null}
                  alt={"Place Image"}
                  className="!w-full !h-full object-contain"
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="bg-white border shadow-xs rounded-xs p-3 flex flex-col">
                <div className="grid grid-cols-3 gap-x-1 w-[100%]">
                  {[
                    {
                      label: "cardEntranceLabel",
                      image: Entrance,
                      background: getColor(selectedVenue?.entranceScore ?? 0)
                        ?.background,
                      tint: getColor(selectedVenue?.entranceScore ?? 0)?.tint,
                    },
                    {
                      label: "cardInteriorLabel",
                      image: Intrance,
                      background: getColor(selectedVenue?.interiorScore ?? 0)
                        ?.background,
                      tint: getColor(selectedVenue?.interiorScore ?? 0)?.tint,
                    },
                    {
                      label: "cardRestroomLabel",
                      image: Restroom,
                      background: getColor(selectedVenue?.restroomScore ?? 0)
                        ?.background,
                      tint: getColor(selectedVenue?.restroomScore ?? 0)?.tint,
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
                        className={`w-full border-gray-300 py-3 rounded-[5px] flex  items-center justify-center`}
                      >
                        <Image
                          src={item?.image}
                          alt={item.label}
                          className={`object-contain h-[28px] w-[30px]  ${item.tint}`}
                        />
                      </div>
                      <p className="text-[#363537] mt-1 text-[11px] font-bold">
                        {t(item?.label)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-center my-4 text-[#787879] text-[12px]">
                  {description}
                </p>
                <button
                  className="bg-primary py-2 rounded-[6px] text-sm"
                  onClick={() =>
                    showCreateReview({
                      name: selectedVenue?.name ?? "",
                      placeId: selectedVenue?.placeId ?? "",
                    })
                  }
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSelectedVenue && (
        <div className="w-[200px] mt-5">
          <h4
            onClick={() => venueDetailsPage(selectedVenue?.placeId ?? "")}
            className="mb-3 text-sm font-semibold text-[#363537]"
          >
            {title}
          </h4>
          <div className="grid grid-cols-3 gap-x-1.5 w-full">
            {[
              {
                label: "cardEntranceLabel",
                image: Entrance,
                background: getColor(selectedVenue?.entranceScore ?? 0)
                  .background,
                tint: getColor(selectedVenue?.entranceScore ?? 0).tint,
              },
              {
                label: "cardInteriorLabel",
                image: Intrance,
                background: getColor(selectedVenue?.interiorScore ?? 0)
                  .background,
                tint: getColor(selectedVenue?.interiorScore ?? 0).tint,
              },
              {
                label: "cardRestroomLabel",
                image: Restroom,
                background: getColor(selectedVenue?.restroomScore ?? 0)
                  .background,
                tint: getColor(selectedVenue?.restroomScore ?? 0).tint,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center  leading-normal rounded flex-shrink-0 "
              >
                <div
                  style={{
                    backgroundColor: item?.background,
                  }}
                  className={`w-full ${
                    getColor(selectedVenue?.entranceScore ?? 0)
                      ? ""
                      : "border-[1px]"
                  } border-gray-300 py-3 rounded-[5px] flex  items-center justify-center`}
                >
                  <Image
                    src={item?.image}
                    alt={item.label}
                    className={`object-contain h-[26px] w-[24px] ${item.tint}`}
                  />
                </div>
                <p className="text-[#363537] mt-1 text-[12px] font-bold">
                  {t(item?.label)}
                </p>
              </div>
            ))}
          </div>

          <p className="my-4 text-center text-[#787879] text-[12px]">
            {selectedVenue?.isReviewed ? null : t("cardNoRatingsMessage")}
          </p>
          <button
            className="mb-4 flex w-full justify-center items-center bg-primary text-black font-bold py-2 px-4 rounded"
            onClick={() =>
              showCreateReview({
                name: selectedVenue?.name ?? "",
                placeId: selectedVenue?.placeId ?? "",
              })
            }
          >
            {t("cardAddReviewButton")}
          </button>
        </div>
      )}
    </>
  );
};

export default CardComponent;
