"use client";
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { showToast } from "@/components/toast";
import { useLazyVenueQuery } from "@/Services/modules/mapathon";
import { venueInterface } from "@/Services/modules/mapathon/venue";
import { useAppSelector } from "@/Store";
import _ from "lodash";
import { LocateFixed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const getScore = (str: string) => {
  if (str === "Any") {
    return "1";
  }
  if (str === "At least Yellow") {
    return "2";
  }
  if (str === "Accessible") {
    return "4";
  }
  return undefined;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>({
      lat: 38.7946,
      lng: 106.5348,
    });
  const filters = useAppSelector((state) => state.search);

  // const [filters, setFilters] = useState({
  //   venueType: "establishment",
  //   participant: "",
  //   interiorScore: "Any",
  //   restroomScore: "Any",
  //   parking: "Allowed",
  // });

  const [fetchVenues, { data: venues, isLoading }] = useLazyVenueQuery();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude = 38.7946, longitude = 106.5348 } = position.coords;
          const location = { lat: latitude, lng: longitude };
          fetchVenues({
            location: `${location?.lat},${location?.lng}`,
            name: filters?.search,
            type: filters.venueType || "establishment",
            entranceScore: filters?.entranceScore
              ? getScore(filters.entranceScore as any)
              : undefined,
            interiorScore: filters?.interiorScore
              ? getScore(filters.interiorScore)
              : undefined,
            restroomScore: filters?.restroomScore
              ? getScore(filters.restroomScore)
              : undefined,
            hasParking: filters?.hasParking === "Allowed" ? "1" : undefined,
          });
          setUserLocation(location);
          setCurrentLocation(location);
        },
        (err) => {
          showToast({ message: err?.message, type: "error" });
        }
      ),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        };
    }
  }, []);

  const handleButtonClick = (venue: venueInterface) => {
    const query = new URLSearchParams({
      name: venue.name,
      placeId: venue.placeId,
    }).toString();
    router.push(`/?${query}`);
  };

  const handleRefetch = async ({
    lat = 38.7946,
    lng = 106.5348,
  }: {
    lat: number;
    lng: number;
  }) => {
    try {
      fetchVenues({
        location: `${lat},${lng}`,
        name: filters?.search,
        type: filters?.venueType || "establishment",
        entranceScore: filters?.entranceScore
          ? getScore(filters.entranceScore as any)
          : undefined,
        interiorScore: filters?.interiorScore
          ? getScore(filters.interiorScore)
          : undefined,
        restroomScore: filters?.restroomScore
          ? getScore(filters.restroomScore)
          : undefined,
        hasParking: filters?.hasParking === "Allowed" ? "1" : undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(() => {
      fetchVenues({
        location: `${currentLocation?.lat},${currentLocation?.lng}`,
        name: filters.search,
        type: filters?.venueType || "establishment",
        entranceScore: filters?.entranceScore
          ? getScore(filters.entranceScore as any)
          : undefined,
        interiorScore: filters?.interiorScore
          ? getScore(filters.interiorScore)
          : undefined,
        restroomScore: filters?.restroomScore
          ? getScore(filters.restroomScore)
          : undefined,
        hasParking: filters?.hasParking === "Allowed" ? "1" : undefined,
      });
    }, 500);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [currentLocation, JSON.stringify(filters)]);

  const showMap = () => {
    const listView = document.getElementById("list-view");
    const mapView = document.getElementById("map-view");
    if (mapView && listView) {
      mapView.style.display = "flex";
      listView.style.display = "none";
    }
  };

  return (
    <div className="flex flex-col-reverse relative md:flex-row gap-4 px-4 pt-4">
      <div
        id="list-view"
        className="lg:max-w-[610px]  w-full bg-gray-100 p-4 gap-3 rounded-lg overflow-y-auto max-h-[calc(100vh-155px)] hidden md:grid md:grid-cols-2 grid-cols-1"
      >
        {venues?.results?.map((venue: venueInterface, index: number) => {
          console.log(venue);
          return (
            <div className="bg-white rounded-lg mb-1" key={index}>
              <CardComponent
                isSelectedVenue={false}
                selectedVenue={venue}
                imageSrc={venue.photo}
                title={venue?.name ?? ""}
                distance={venue?.distance}
                description={
                  venue?.isReviewed
                    ? "View All reviews"
                    : t("homeNoRatingsMessage")
                }
                buttonText={t("homeAddReviewButton")}
                onButtonClick={() => handleButtonClick(venue)}
              />
            </div>
          );
        })}
        <div className="flex justify-center w-full">
          <button
            onClick={showMap}
            className="gap-x-2 px-4 justify-center md:hidden absolute bottom-3 flex lg:px-6 py-2 lg:py-3 text-[12px] lg:text-[18px] bg-gray-500 text-white rounded-[8px] whitespace-nowrap"
          >
            <LocateFixed className=" h-4 w-4" />
            Show Map
          </button>
        </div>
      </div>
      <div id="map-view" className="flex w-full">
        <div className="flex-grow bg-white rounded-lg max-h-[calc(100vh-155px)]">
          <Map
            currentLocation={currentLocation}
            venues={venues?.results || []}
            userLocation={userLocation}
            refetch={handleRefetch}
            setUserLocation={setUserLocation}
            setCurrentLocation={setCurrentLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
