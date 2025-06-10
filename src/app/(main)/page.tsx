"use client";
import CreateReview from "@/components/addReview/CreateReview";
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { useLazyVenueQuery } from "@/Services/modules/mapathon";
import { venueInterface } from "@/Services/modules/mapathon/venue";
import _ from "lodash";
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
  const [selectedVenue, setSelectedVenue] = useState<venueInterface | null>(null);
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

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 px-4 pt-4">
      <div className="lg:max-w-[610px] w-full bg-gray-100 p-4 gap-3 rounded-lg overflow-y-auto max-h-[calc(100vh-155px)] grid grid-cols-2">
        {venues?.results?.map((venue: venueInterface, index: number) => {
          return (
            <div className="bg-white rounded-lg mb-1" key={index}>
              <CardComponent
                isSelectedVenue={false}
                selectedVenue={venue}
                imageSrc={venue.photo}
                title={venue?.name ?? ''}
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
      </div>
      <div className="flex-grow bg-white rounded-lg max-h-[calc(100vh-155px)]">
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
      {/* {isModalOpen && selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-[90vh] w-full">
            <CreateReview handleRefetch={handleRefetch} />

            <button
              onClick={handleClose}
              className="mt-4 text-center w-full text-white bg-red-500 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Home;
