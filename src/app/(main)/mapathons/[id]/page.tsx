"use client";
import Image from "next/image";
import MarkerUserIcon from "@/assets/icons/marker-user-icon";
import MarkerStarIcon from "@/assets/icons/marker-star-icon";
import MarkerCalendarIcon from "@/assets/icons/marker-calendar-icon";
import MarkerLocationIcon from "@/assets/icons/marker-location-icon";
import Avatar from "@/assets/images/Avatar.png";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter, formatDate } from "@/utils/helperFunction";
import { useEventDetailsQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface MapathonDetails {
  id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  startingPoint: string;
  donationEnabled: boolean;
  donationAmounts: { value: number }[];
  donationGoal: number;
  endDate: string;
  isOpen: boolean;
  participantsGoal: number;
  reviewsGoal: number;
  startDate: string;
  teamManager: string;
  address: string;
  reviewsAmount: number;
  ranking: number;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  managers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  eventName: string;
  eventLocation: string;
  mapUrl: string;
  reviewCount: number;
}

const MapathonDetailPage = () => {
  const id = useParams()?.id;
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const { data: mapathonDetails } = useEventDetailsQuery(id as string) as {
    data: MapathonDetails;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.href;
      setUrl(path);
    }
  }, [url]);

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
        <div className="flex items-center gap-6">
          <p className="text-[#353435] font-medium text-base leading-[22px] font-poppins">
            {t("teamShareLabel")}
          </p>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FacebookIcon />
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            <FaWhatsapp style={{ color: "#25D366", fontSize: "36px" }} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=Check%20out%20this%20Mapathon%20event!`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <TwitterIcon />
          </a>
        </div>
        {/* <div className="bg-yellow-100 p-3 rounded-lg flex items-center mt-4">
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
        </div> */}

        <div className="mt-6">
          <h3 className="font-bold text-xlg">
            {t("mapathonDetailsManager")} ({mapathonDetails?.managers.length})
          </h3>
          {mapathonDetails?.managers.length > 0 ? (
            <div className="space-y-4">
              {mapathonDetails?.managers.map((manager: any) => (
                <div
                  key={manager.id}
                  className="mt-3 flex flex-col items-start"
                >
                  <Image
                    src={manager.avatar || Avatar}
                    alt="Manager Avatar"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <span className="font-md text-gray-800 mt-3">
                    {capitalizeFirstLetter(manager.firstName)}{" "}
                    {capitalizeFirstLetter(manager.lastName)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="font-medium text-gray-800 mt-2">
              {t("mapathonDetailsManagerNotFound")}
            </span>
          )}

          <div className="mt-6">
            <h3 className="font-bold text-xlg">
              {t("mapathonDetailsParticipant")} (
              {mapathonDetails?.participants.length})
            </h3>
            {mapathonDetails?.participants.length > 0 ? (
              <div className="space-y-4">
                {mapathonDetails?.participants.map((participant: any) => (
                  <div
                    key={participant.id}
                    className="mt-3 flex flex-col items-start"
                  >
                    <Image
                      src={participant.avatar || Avatar}
                      alt="Manager Avatar"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <span className="font-medium text-gray-800 mt-3">
                      {capitalizeFirstLetter(participant.firstName)}{" "}
                      {capitalizeFirstLetter(participant.lastName)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="font-medium text-gray-800 mt-2">
                {t("mapathonDetailsParticipantNotFound")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapathonDetailPage;
