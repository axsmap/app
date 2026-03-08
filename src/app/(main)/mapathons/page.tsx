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
import { useLazyEventQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import { EventType } from "@/Services/modules/mapathon/upcomingEvents";
import { LoaderCircle } from "lucide-react";

type mapathonTypes = "active" | "inactive" | "upComing" | "draft";

const Mapathons = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [total, setTotal] = useState<number>(0);
  const [type, setType] = useState<mapathonTypes>("active");
  const [extras, setExtras] = useState({
    active: { more: true, page: 1 },
    inactive: { more: true, page: 1 },
    upComing: { more: true, page: 1 },
    draft: { more: true, page: 1 },
  });

  const [mapathons, setMapathons] = useState<{
    inactive: EventType[];
    upComing: EventType[];
    active: EventType[];
    draft: EventType[];
  }>({
    inactive: [],
    upComing: [],
    active: [],
    draft: [],
  });
  const [fetchEvents, { isLoading }] = useLazyEventQuery();

  const statusMap: Record<mapathonTypes, "active" | "upcoming" | "inactive" | "draft"> = {
    active: "active",
    upComing: "upcoming",
    inactive: "inactive",
    draft: "draft",
  };

  const ITEMS_PER_PAGE = 12;

  const fetchInitialData = async (page: number) => {
    if (!extras[type].more) return;

    try {
      const res = await fetchEvents({
        status: statusMap[type],
        page: page,
        limit: ITEMS_PER_PAGE,
      }).unwrap();

      setExtras((prev) => ({
        ...prev,
        [type]: {
          more:
            [...(res?.results ?? []), ...mapathons[type]].length < res?.total,
          page,
        },
      }));
      setMapathons((prev) => ({
        ...prev,
        [type]:
          page === 1 ? res.results || [] : [...prev[type], ...res?.results],
      }));
    } catch (err) {
      console.error("Failed to fetch mapathons:", err);
      // Ensure loading state ends even on error
      setExtras((prev) => ({
        ...prev,
        [type]: { more: false, page },
      }));
    }
  };

  useEffect(() => {
    fetchInitialData(1);
  }, [type]);

  const handleCreate = () => {
    router.push("/mapathons/create-mapathon");
  };

  const handleLoadMore = async () => {
    fetchInitialData(extras[type].page + 1);
  };

  return (
    <div className="container m-auto px-46">
      <div className="flex flex-col mt-6 sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0 ml-6 mr-6">
        <h2 className="text-xl font-bold w-full sm:w-auto text-center sm:text-left">
          {t("mapathonsTitle")}
        </h2>

        <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-start">
          <div
            onClick={() => setType("active")}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              type === "active" ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                type === "active" ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsActive")}
            </span>
          </div>
          <div
            onClick={validateLogin(() => setType("inactive"))}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              type === "inactive" ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                type === "inactive" ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsInactive")}
            </span>
          </div>
          <div
            onClick={validateLogin(() => setType("upComing"))}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              type === "upComing" ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                type === "upComing" ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsUpcoming")}
            </span>
          </div>
          <div
            onClick={validateLogin(() => setType("draft"))}
            className={`px-6 py-2 rounded-lg cursor-pointer flex justify-center items-center ${
              type === "draft" ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`mr-4 ${
                type === "draft" ? "text-black font-bold" : "text-black"
              }`}
            >
              {t("mapathonsMyDrafts")}
            </span>
          </div>

          <button
            className="max-w-sm mx-auto w-full sm:w-auto bg-primary text-black px-6 py-2 rounded-lg"
            onClick={validateLogin(handleCreate)}
          >
            {t("mapathonsCreateButton")}
          </button>
        </div>
      </div>

        {mapathons?.[type]?.length === 0 && isLoading &&(
          <div className="flex my-4 w-[100%] items-center justify-center">
           <LoaderCircle className={`h-20 w-20 text-primary ${isLoading ? "animate-spin" : ""}`} />
          </div>
        )}

        {mapathons?.[type]?.length === 0 && !isLoading &&(
          <div className="flex my-4 w-[100%] items-center justify-center">
           <p className="capitalize text-base my-3 font-bold text-gray-500">No Mapathon found!</p>
          </div>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-6 mr-6">
        {(mapathons?.[type] ?? [])?.length > 0 &&
          (mapathons?.[type] ?? [])?.map((item, index) => {
            // Extract and validate coordinates
            const coordinates = item?.location?.coordinates;
            const hasValidCoordinates = 
              Array.isArray(coordinates) && 
              coordinates.length >= 2 &&
              typeof coordinates[0] === 'number' && 
              typeof coordinates[1] === 'number' &&
              !isNaN(coordinates[0]) &&
              !isNaN(coordinates[1]);
            
            // GeoJSON format is [longitude, latitude]
            // Google Maps expects lat,lng so we use coordinates[1],coordinates[0]
            const lat = hasValidCoordinates ? coordinates[1] : 0;
            const lng = hasValidCoordinates ? coordinates[0] : 0;
            
            return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col relative"
            >
              {/* Draft badge overlay */}
              {item?.status === "draft" && (
                <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {t("mapathonDraftBadge")}
                </div>
              )}
              <Link href={`/mapathons/${item?.id}`}>
                {hasValidCoordinates ? (
                  <div className="w-full">
                    <iframe
                      width="100%"
                      height="192"
                      style={{ border: 0, borderRadius: "8px" ,pointerEvents: 'none' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Map preview unavailable</p>
                  </div>
                )}

                <div className="w-full p-4">
                  <h3 className="font-semibold text-lg">{item?.name}</h3>

                  <div className="flex items-center mt-2">
                    <LocationIcon className="mr-2" />
                    <p className="text-sm text-gray-600">{item?.address}</p>
                  </div>

                  <div className="flex items-center mt-2">
                    <CalendarIcon className="mr-2" />
                    <p className="text-sm text-gray-600">
                      {`${t("mapathonsDateRangeFrom")} ${formatDate(
                        item?.startDate
                      )} ${t("mapathonsDateRangeTo")} ${formatDate(
                        item?.endDate
                      )}`}
                    </p>
                  </div>

                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 flex items-center whitespace-nowrap">
                      <StarIcon className="mr-2" />
                      {item?.reviewsAmount} {t("mapathonsReviewsMade")}{" "}
                      {item?.reviewsGoal} {t("mapathonReviewsGoal")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            );
          })}
      </div>

      {extras[type].more && mapathons[type]?.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]"
            onClick={handleLoadMore}
          >
            <RefereshIcon className={isLoading ? "animate-spin" : ""} />
            <span>
              {isLoading ? t("mapathonsLoading") : t("mapathonsLoadMore")}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Mapathons;
