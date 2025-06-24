"use client";
import Image from "next/image";
import MarkerUserIcon from "@/assets/icons/marker-user-icon";
import MarkerStarIcon from "@/assets/icons/marker-star-icon";
import MarkerCalendarIcon from "@/assets/icons/marker-calendar-icon";
import MarkerLocationIcon from "@/assets/icons/marker-location-icon";
import Avatar from "@/assets/images/Avatar.png";
import { useParams } from "next/navigation";
import {
  capitalizeFirstLetter,
  formatDate,
  getDateStatus,
} from "@/utils/helperFunction";
import { useEventDetailsQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Calendar, Locate, MapPin, Target, Users } from "lucide-react";
import { useAppSelector } from "@/Store";

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
  const userId= useAppSelector(state=>state.user.user?.id)
  const { data: mapathonDetails, } = useEventDetailsQuery(id as string) as {
    data: MapathonDetails;
  };
  useEffect(() => {
    const path = window.location.href;
    setUrl(path);
  }, [url]);

  const handleGetMapping = () => {
    if (mapathonDetails?.location.coordinates) {
      window.location.href = `https://www.google.com/maps?q=${mapathonDetails.location.coordinates[1]},${mapathonDetails.location.coordinates[0]}`;
    } else {
      alert("Map URL not available");
    }
  };

  console.log(userId)

  return (
    <div className="max-w-4xl p-6 mx-auto sm:ml-4 md:ml-8 lg:ml-12">
      <p className="mb-3 text-2xl font-bold">Location</p>
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="w-full">
          <iframe
            width="100%"
            height="252"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapathonDetails?.location.coordinates[1]},${mapathonDetails?.location?.coordinates[0]}&z=15&output=embed`}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <div className="flex gap-x-2 mb-2">
          <div className="bg-black px-3 rounded-lg capitalize text-sm text-white">
            {getDateStatus(
              mapathonDetails?.startDate,
              mapathonDetails?.endDate
            )}
          </div>
          <div className="border-[1px] rounded-lg text-sm px-3">
            Rank# {mapathonDetails?.ranking}
          </div>
        </div>
        <p className="text-2xl sm:text-xl font-bold">{mapathonDetails?.name}</p>
        <p className="text-base mt-2 text-gray-900">
          {mapathonDetails?.description}
        </p>
        <div className="flex gap-x-20 my-3">
          <div className="flex mt-2 items-center gap-x-2">
            <Calendar className="h-6 w-6 text-black" />
            <div>
              <p className="text-sm text-black font-bold">Start Date</p>
              <p className="text-sm text-gray-500">
                {formatDate(mapathonDetails?.startDate)}
              </p>
            </div>
          </div>
          <div className="flex mt-2 items-center gap-x-2">
            <Calendar className="h-6 w-6 text-black" />
            <div>
              <p className="text-sm text-black font-bold">End Date</p>
              <p className="text-sm text-gray-500">
                {formatDate(mapathonDetails?.endDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex mt-2 items-center gap-x-2">
          <MapPin className="h-6 w-6 text-black" />
          <div>
            <p className="text-sm text-black font-bold">Location</p>
            <p className="text-sm text-gray-500">{mapathonDetails?.address}</p>
          </div>
        </div>
        <div className="flex items-center mt-3 gap-6">
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
        {![...(mapathonDetails?.participants ?? []), ...(mapathonDetails?.managers ?? [])]?.some(
            (participant) => participant?.id === userId,
          ) && <div className="flex items-center mt-4">
          <button
            onClick={handleGetMapping}
            className="bg-primary text-black px-4 py-2 rounded-md"
          >
            Join Mapathon
          </button>
        </div>}
      </div>

      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <p className="text-2xl sm:text-xl font-bold">Event Progress</p>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <Users />
              <p>Participents</p>
            </div>
            <p>
              {mapathonDetails?.participants?.length}/
              {mapathonDetails?.participantsGoal}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  (mapathonDetails?.participants?.length /
                    mapathonDetails?.participantsGoal) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <Target />
              <p>Reviews</p>
            </div>
            <p>
              {mapathonDetails?.reviewsAmount}/{mapathonDetails?.reviewsGoal}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  (mapathonDetails?.reviewsAmount /
                    mapathonDetails?.reviewsGoal) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <h3 className="font-bold text-xlg">
          {t("mapathonDetailsManager")} ({mapathonDetails?.managers?.length})
        </h3>
        {mapathonDetails?.managers?.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
            {mapathonDetails?.managers.map((manager: any) => (
              <div
                key={manager?.id}
                className="flex items-center gap-x-2 border-[1px] py-2 px-2 rounded-lg"
              >
                <Image
                  src={manager?.avatar || Avatar}
                  alt="Manager Avatar"
                  width={50}
                  height={50}
                  className="rounded-full "
                />
                <div>
                  <p className="text-base text-black font-[500]">
                    {" "}
                    {capitalizeFirstLetter(manager?.firstName)}{" "}
                    {capitalizeFirstLetter(manager?.lastName)}
                  </p>
                  <p className="text-sm text-gray-500">Participant</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="font-medium text-gray-800 mt-2">
            {t("mapathonDetailsManagerNotFound")}
          </span>
        )}
      </div>

      <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
        <h3 className="font-bold text-xlg">
          {t("mapathonDetailsParticipant")} (
          {mapathonDetails?.participants.length})
        </h3>
        {mapathonDetails?.participants.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
            {mapathonDetails?.participants.map((participant: any) => (
              <div
                key={participant?.id}
                className="flex items-center gap-x-2 border-[1px] py-2 px-2 rounded-lg"
              >
                <Image
                  src={participant?.avatar || Avatar}
                  alt="Manager Avatar"
                  width={50}
                  height={50}
                  className="rounded-full "
                />
                <div>
                  <p className="text-base text-black font-[500]">
                    {capitalizeFirstLetter(participant?.firstName)}{" "}
                    {capitalizeFirstLetter(participant?.lastName)}
                  </p>
                  <p className="text-sm text-gray-500">Participant</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="font-medium text-gray-800 mt-2">
            {t("mapathonDetailsParticipantNotFound")}
          </span>
        )}
      </div>

      {/* { prev code } */}
      <div className="space-y-4 text-sm text-[#353435]">

        {/* <div className="flex items-center">
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

        <div className="flex items-center">
          <button
            onClick={handleGetMapping}
            className="bg-yellow-500 text-black px-4 py-2 rounded-md"
          >
            {t("getMappingButton")}
          </button>
        </div> */}

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
      </div>
    </div>
  );
};

export default MapathonDetailPage;
