"use client";
import LocationIcon from "@/assets/icons/locaton-icon";
import CalendarIcon from "@/assets/icons/calendar-icon";
import StarIcon from "@/assets/icons/star-icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RefereshIcon from "@/assets/icons/refresh-icon";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/helperFunction";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";
import {
  useLazyEventQuery,
  useLazyOldEventQuery,
  useLazyUpcomingEventQuery,
} from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";

const Mapathons = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [isUpcoming, setIsUpcoming] = useState(false);

  interface EventProps {
    id: string;
    name: string;
    address: string;
    location: {
      coordinates: [number, number];
    };
    startDate: string;
    endDate: string;
    reviewsAmount: number;
    reviewsGoal: number;
  }

  const [eventList, setEventList] = useState<EventProps[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [fetchEvents] = useLazyEventQuery();
  const [fetchUpcomingEvents] = useLazyUpcomingEventQuery();
  const [fetchOldEvents] = useLazyOldEventQuery();

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchInitialData = async () => {
      setCurrentPage(1);
      if (isUpcoming) {
        const res = await fetchUpcomingEvents({
          page: 1,
          limit: ITEMS_PER_PAGE,
        }).unwrap();
        setEventList(res.results || []);
        setTotal(res.total || "");
      } else if (isActive) {
        const res = await fetchEvents({
          keywords: "",
          page: 1,
          limit: ITEMS_PER_PAGE,
        }).unwrap();
        setEventList(res.results || []);
        setTotal(res.total || "");
      } else {
        const res = await fetchOldEvents({
          page: 1,
          limit: ITEMS_PER_PAGE,
        }).unwrap();
        setEventList(res.results || []);
        setTotal(res.total || "");
      }
    };

    fetchInitialData();
  }, [isActive, isUpcoming]);

  const handleToggle = (type) => {
    if (type === "active") {
      setIsActive(true);
      setIsUpcoming(false);
    } else if (type === "inactive") {
      setIsActive(false);
      setIsUpcoming(false);
    } else if (type === "upcoming") {
      setIsActive(false);
      setIsUpcoming(true);
    }
  };

  const handleCreate = () => {
    router.push("/mapathons/create-mapathon");
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    if (eventList.length < total) {
      setCurrentPage(nextPage);
      setIsLoadingMore(true);

      try {
        let res;
        if (isUpcoming) {
          res = await fetchUpcomingEvents({
            page: nextPage,
            limit: ITEMS_PER_PAGE,
          }).unwrap();
        } else if (isActive) {
          res = await fetchEvents({
            keywords: "",
            page: nextPage,
            limit: ITEMS_PER_PAGE,
          }).unwrap();
        } else {
          res = await fetchOldEvents({
            page: nextPage,
            limit: ITEMS_PER_PAGE,
          }).unwrap();
        }

        setEventList((prev: EventProps[]) => [...prev, ...(res.results || [])]);
      } catch (err) {
        console.error("Error loading more events:", err);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  return (
    <div className="container m-auto bg-gray-50 px-46">
      <div className="flex justify-center mb-8">
        <iframe
          src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
          title="AXS Map: Join the Movement Today"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className=" lg:w-[560px] sm:w-[300px] h-[315px]"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold w-full sm:w-auto text-center sm:text-left">
          {t("mapathonsTitle")}
        </h2>

        <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-start">
          <div
            onClick={() => handleToggle("active")}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              isActive ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                isActive ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsActive")}
            </span>
          </div>
          <div
            onClick={validateLogin(() => handleToggle("inactive"))}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              !isActive && !isUpcoming ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                !isActive && !isUpcoming ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsInactive")}
            </span>
          </div>
          <div
            onClick={validateLogin(() => handleToggle("upcoming"))}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              isUpcoming ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                isUpcoming ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsUpcoming")}
            </span>
          </div>

          <form className="max-w-sm mx-auto w-full sm:w-auto">
            <select
              id="all"
              defaultValue="all"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 block w-full p-2.5"
            >
              <option value="all">{t("mapathonsFilterAll")}</option>
              <option value="10miles">{t("mapathonsFilter10Miles")}</option>
              <option value="20miles">{t("mapathonsFilter20Miles")}</option>
              <option value="50miles">{t("mapathonsFilter50Miles")}</option>
            </select>
          </form>

          <button
            className="max-w-sm mx-auto w-full sm:w-auto bg-yellow-400 text-black px-6 py-2 rounded-lg"
            onClick={validateLogin(handleCreate)}
          >
            {t("mapathonsCreateButton")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eventList.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-600">
            {t("noRecordFound")}
          </div>
        ) : (
          eventList.map((mapathon, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col"
            >
              <Link href={`/mapathons/${mapathon.id}`}>
                <div className="w-full">
                  <iframe
                    width="100%"
                    height="192"
                    style={{ border: 0, borderRadius: "8px" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${mapathon.location.coordinates[1]},${mapathon.location.coordinates[0]}&z=15&output=embed`}
                  />
                </div>

                <div className="w-full p-4">
                  <h3 className="font-semibold text-lg">{mapathon.name}</h3>

                  <div className="flex items-center mt-2">
                    <LocationIcon className="mr-2" />
                    <p className="text-sm text-gray-600">{mapathon.address}</p>
                  </div>

                  <div className="flex items-center mt-2">
                    <CalendarIcon className="mr-2" />
                    <p className="text-sm text-gray-600">
                      {`${t("mapathonsDateRangeFrom")} ${formatDate(
                        mapathon.startDate
                      )} ${t("mapathonsDateRangeTo")} ${formatDate(
                        mapathon.endDate
                      )}`}
                    </p>
                  </div>

                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 flex items-center whitespace-nowrap">
                      <StarIcon className="mr-2" />
                      {mapathon.reviewsAmount} {t("mapathonsReviewsMade")}{" "}
                      {mapathon.reviewsGoal} {t("mapathonReviewsGoal")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {eventList.length > 0 && eventList.length >= ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6">
          <button
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]"
            onClick={handleLoadMore}
          >
            <RefereshIcon className={isLoadingMore ? "animate-spin" : ""} />
            <span>
              {isLoadingMore ? t("mapathonsLoading") : t("mapathonsLoadMore")}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Mapathons;
