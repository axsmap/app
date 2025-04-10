"use client";
import Image from "next/image";
import LocationIcon from "@/assets/icons/locaton-icon";
import CalendarIcon from "@/assets/icons/calendar-icon";
import StarIcon from "@/assets/icons/star-icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RefereshIcon from "@/assets/icons/refresh-icon";
import { useState, useEffect } from "react";
import {} from "@/app/Services/api"; // Import API hooks
import {
  useEventQuery,
  useOldEventQuery,
} from "@/app/Services/modules/mapathon";

const Mapathons = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const { data: activeEvents, refetch: fetchEvents } = useEventQuery({
    keywords: "",
    page: currentPage,
  });
  const { data: oldEvents, refetch: fetchOldEvents } = useOldEventQuery();

  const handleCreate = () => {
    router.push("/mapathons/create-mapathon");
  };
  useEffect(() => {
    if (isActive) {
      fetchEvents();
    } else {
      fetchOldEvents();
    }
  }, [isActive, fetchEvents, fetchOldEvents]);

  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
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
          {/* Toggling Active/Inactive Div */}
          <div
            onClick={handleToggle}
            className={`px-6 py-2 rounded-lg bg-yellow-400 cursor-pointer flex justify-center items-center`}
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
            onClick={handleCreate}
          >
            + Create a Mapathon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render events based on selected status */}
        {(isActive ? activeEvents?.result : oldEvents?.result)?.map(
          (mapathon, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col"
            >
              <Link href={`/mapathons/${mapathon.id}`} key={mapathon.id}>
                <div className="w-full">
                  <Image
                    src={mapathon.mapUrl}
                    alt="Map Thumbnail"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="w-full p-4">
                  <h3 className="font-semibold text-lg">{mapathon.title}</h3>
                  <div className="flex items-center mt-2">
                    <LocationIcon className="mr-2" />
                    <p className="text-sm text-gray-600">{mapathon.location}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <CalendarIcon className="mr-2" />
                    <p className="text-sm text-gray-600">{mapathon.location}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 flex items-center whitespace-nowrap">
                      <StarIcon className="mr-2" /> {mapathon.reviewCount}{" "}
                      reviews from {mapathon.reviews} reviews
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]">
          <RefereshIcon />
          <span>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default Mapathons;
