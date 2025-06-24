"use client";
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { useLazyVenueQuery } from "@/Services/modules/mapathon";
import { venueInterface } from "@/Services/modules/mapathon/venue";
import _ from "lodash";
import { LocateFixed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<venueInterface | null>(
    null
  );
  const [filters, setFilters] = useState({
    venueType: "establishment",
    participant: "",
    interiorScore: "Any",
    restroomScore: "Any",
    parking: "Allowed",
  });

  const [fetchVenues, { data: venues, isLoading }] = useLazyVenueQuery();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          fetchVenues({
            location: `${location?.lat},${location?.lng}`,
            name: searchQuery,
            type: filters.venueType || "establishment",
          });
          setUserLocation(location);
          setCurrentLocation(location);
        },
        (err) => {
          fetchVenues({
            location: `${37.0902}, ${-95.7129}}`,
            name: searchQuery,
            type: filters.venueType || "establishment",
          });
          // Toast({ type: "error", message: "Please allow location access" });
          console.error("Error getting location:", err);
        }
      );
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = (venue: venueInterface) => {
    const query = new URLSearchParams({
      name: venue.name,
      placeId: venue.placeId,
    }).toString();
    setSelectedVenue(venue);
    router.push(`/?${query}`);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
    router.push("/");
  };

  const handleRefetch = async ({ lat, lng }: { lat: number; lng: number }) => {
    try {
      fetchVenues({
        location: `${lat},${lng}`,
        name: searchQuery,
        type: filters?.venueType || "establishment",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(() => {
      fetchVenues({
        location: `${currentLocation?.lat},${currentLocation?.lng}`,
        name: searchQuery,
        type: filters?.venueType || "establishment",
      });
    }, 500);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, currentLocation, filters.venueType]);

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
        <div
          className="flex-grow bg-white rounded-lg max-h-[calc(100vh-155px)]">
          <Map
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            venues={venues?.results || []}
            userLocation={userLocation}
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            refetch={handleRefetch}
            setUserLocation={setUserLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
