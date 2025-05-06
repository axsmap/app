"use client";
import React, { useState, useEffect } from "react";
import Map from "@/components/Map";
import { useVenueQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import CreateReview from "@/components/addReview/CreateReview";
import { useRouter } from "next/navigation";
import CardComponent from "@/components/Card";
import Link from "next/link";

export type Venue = {
  name: string;
  photo: string;
  description: string;
  placeId: string;
  distance?: string;
  isReviewed?: boolean;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>({
      lat: 31.4632671,
      lng: 74.3777961,
    });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filters, setFilters] = useState({
    venueType: "establishment",
    participant: "",
    interiorScore: "Any",
    restroomScore: "Any",
    parking: "Allowed",
  });
  const { data: venues, refetch } = useVenueQuery({
    location: userLocation
      ? `${userLocation.lat},${userLocation.lng}`
      : "31.4632671,74.3777961",
    name: searchQuery,
    type: filters.venueType || "establishment",
    page: "",
  });
  const venueData = venues?.results || [];

  // useEffect(() => {
  //   if (userLocation) {
  //     refetch();
  //   }
  // }, [userLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  }, [navigator.geolocation]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = (
    venue: Venue,
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const query = new URLSearchParams({
      name: venue.name,
      placeId: venue.placeId,
    }).toString();
    router.push(`/?${query}`);
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
    router.push("/");
  };

  const handleRefetch = () => refetch();

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className=" w-full lg:w-2/3 bg-white p-4 rounded-lg max-h-[calc(100vh-2rem)]">
        <Map
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          venues={venueData}
          filters={filters}
          setFilters={setFilters}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleRefetch={handleRefetch}
        />
      </div>

      <div className="w-full lg:w-2/4 bg-white p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
        {venueData?.map((venue: Venue, index: number) => (
          <div className="bg-white p-4 rounded-lg mb-1" key={index}>
            <Link href={`/venue/${venue.placeId}`}>
              <CardComponent
                isSelectedVenue={false}
                selectedVenue={venue}
                imageSrc={venue.photo}
                title={venue.name}
                distance={venue.distance}
                description={
                  venue?.isReviewed
                    ? venue.description
                    : t("homeNoRatingsMessage")
                }
                buttonText={t("homeAddReviewButton")}
                onButtonClick={(e: any) => handleButtonClick(venue, e)}
              />
            </Link>
          </div>
        ))}
      </div>

      {isModalOpen && selectedVenue && (
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
      )}
    </div>
  );
};

export default Home;
