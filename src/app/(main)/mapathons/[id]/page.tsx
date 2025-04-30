"use client";
import Image from "next/image";
import MarkerUserIcon from "@/assets/icons/marker-user-icon";
import MarkerStarIcon from "@/assets/icons/marker-star-icon";
import MarkerCalendarIcon from "@/assets/icons/marker-calendar-icon";
import MarkerLocationIcon from "@/assets/icons/marker-location-icon";
import Avatar from "@/assets/images/Avatar.png";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/helperFunction";
import { useEventDetailsQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";

const MapathonDetailPage = () => {
  const id = useParams()?.id;
  const { t } = useTranslation();
  const { data: mapathonDetails } = useEventDetailsQuery(id as string);
  console.log("mapathonDetails", mapathonDetails);
  const progress =
    (mapathonDetails?.reviewsAmount / mapathonDetails?.reviewsGoal) * 100;

  return (
    <div className="max-w-4xl p-6 mx-auto sm:ml-4 md:ml-8 lg:ml-12">
      <h2 className="text-2xl sm:text-xl font-bold mb-4">
        {mapathonDetails?.name}
      </h2>

      <div className="rounded-lg overflow-hidden mb-6">
        <div className="w-full">
          <iframe
            width="100%"
            height="192"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapathonDetails?.location.coordinates[1]},${mapathonDetails?.location?.coordinates[0]}&z=15&output=embed`}
          />
        </div>
      </div>

      <div className="space-y-4 text-sm text-[#353435]">
        <div className="flex items-center">
          <MarkerLocationIcon className="mr-2" />
          <p className="text-sm sm:text-base">{mapathonDetails?.address}</p>
        </div>

        <div className="flex items-center">
          <MarkerCalendarIcon className="mr-2" />
          <p className="text-sm sm:text-base">
            {`${t("mapathonDetailsDateRangeFrom")} ${formatDate(
              mapathonDetails?.startDate
            )} ${t("mapathonDetailsDateRangeTo")} ${formatDate(
              mapathonDetails?.endDate
            )}`}
          </p>
        </div>

        <div className="flex items-center">
          <MarkerStarIcon className="mr-2" />
          <p className="text-sm sm:text-base">
            {mapathonDetails?.ranking} {t("mapathonDetailsRanking")}
          </p>
        </div>

        <div className="flex items-center">
          <MarkerUserIcon className="mr-2" />
          <p className="text-sm sm:text-base">
            {mapathonDetails?.participants.length}{" "}
            {t("mapathonDetailsParticipantsFrom")}{" "}
            {mapathonDetails?.participantsGoal}{" "}
            {t("mapathonDetailsParticipantsGoal")}
          </p>
        </div>

        <div className="bg-yellow-100 p-3 rounded-lg flex items-center mt-4">
          <Image
            src={Avatar}
            alt="User"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="ml-3 font-medium text-gray-800">William Gibbs</span>
          <div className="relative ml-4 flex-1">
            <div className="flex mb-1/2">
              <div
                className="flex w-full bg-gray-200 rounded-full"
                style={{ height: "8px", width: "98%" }}
              >
                <div
                  className="bg-yellow-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold inline-block py-1 uppercase text-yellow-500 mr-2">
              {Math.round(progress).toString()} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapathonDetailPage;
