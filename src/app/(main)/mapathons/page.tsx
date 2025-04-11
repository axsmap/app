"use client";
import Image from "next/image";
import LocationIcon from "@/assets/icons/locaton-icon";
import CalendarIcon from "@/assets/icons/calendar-icon";
import StarIcon from "@/assets/icons/star-icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RefereshIcon from "@/assets/icons/refresh-icon";
import { useState, useEffect } from "react";
import {
  useEventQuery,
  useLazyEventQuery,
  useLazyOldEventQuery,
  useOldEventQuery,
} from "@/app/Services/modules/mapathon";
import { formatDate } from "@/utils/constants";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";

const Mapathons = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [fetchEvents] = useLazyEventQuery();
  const [fetchOldEvents] = useLazyOldEventQuery();

  useEffect(() => {
    const fetchInitialData = async () => {
      setCurrentPage(1);
      if (isActive) {
        const res = await fetchEvents({ keywords: "", page: 1 }).unwrap();
        setEventList(res.results || []);
      } else {
        const res = await fetchOldEvents({ page: 1 }).unwrap();
        setEventList(res.results || []);
      }
    };

    fetchInitialData();
  }, [isActive]);

  const handleToggle = () => {
    if (isActive) {
      const validated = validateLogin(() => setIsActive(false));
      validated();
    } else {
      setIsActive(true);
    }
  };

  const handleCreate = () => {
    router.push("/mapathons/create-mapathon");
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setIsLoadingMore(true);

    try {
      let res;
      if (isActive) {
        res = await fetchEvents({ keywords: "", page: nextPage }).unwrap();
      } else {
        res = await fetchOldEvents({ page: nextPage }).unwrap();
      }

      setEventList((prev) => [...prev, ...(res.results || [])]);
    } catch (err) {
      console.error("Error loading more events:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="flex justify-center mb-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
          title="AXS Map: Join the Movement Today"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Mapathons</h2>
        <div className="flex gap-4 items-center">
          <div
            onClick={handleToggle}
            className="px-6 py-2 rounded-lg bg-yellow-400 cursor-pointer flex justify-center items-center"
          >
            <span
              className={`mr-4 ${
                isActive ? "text-white-400 font-bold" : "text-white"
              }`}
            >
              Active
            </span>
            <span
              className={`${
                !isActive ? "text-white-400 font-bold" : "text-white"
              }`}
            >
              Inactive
            </span>
          </div>
          <form className="max-w-sm mx-auto">
            <select
              id="all"
              defaultValue="all"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 block w-full p-2.5"
            >
              <option value="all">All</option>
              <option value="10miles">10 miles</option>
              <option value="20miles">20 miles</option>
              <option value="50miles">50 miles</option>
            </select>
          </form>
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
            onClick={validateLogin(handleCreate)}
          >
            + Create a Mapathon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eventList.map((mapathon, index) => (
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
                    From {formatDate(mapathon.startDate)} to{" "}
                    {formatDate(mapathon.endDate)}
                  </p>
                </div>

                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600 flex items-center whitespace-nowrap">
                    <StarIcon className="mr-2" />
                    {mapathon.reviewsAmount} reviews made from{" "}
                    {mapathon.reviewsGoal} reviews
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
        >
          <RefereshIcon className={isLoadingMore ? "animate-spin" : ""} />
          <span>{isLoadingMore ? "Loading..." : "Load More"}</span>
        </button>
      </div>
    </div>
  );
};

export default Mapathons;
