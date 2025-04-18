"use client";
import React, { useState, useEffect } from "react";
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { getGeneralType, stepsData } from "@/utils/constants";
import StepperComponent from "@/components/custom-modal/stepper-component";
import { useVenueQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";

export type Venue = {
  name: string;
  photo: string;
  description: string;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [filters, setFilters] = useState({
    venueType: "Select",
    participant: "",
    interiorScore: "",
    restroomScore: "",
    parking: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedVenues, setLoadedVenues] = useState<Venue[]>([]);

  const { data: venues } = useVenueQuery({
    location: userLocation ? `${userLocation.lat},${userLocation.lng}` : "",
    name: searchQuery,
    type: getGeneralType(filters?.venueType),
    page: "",
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
              },
              (err) => {
                console.error("Error getting location:", err);
              }
            );
          }
        });
    }
  }, []);

  useEffect(() => {
    if (venues?.results) {
      const filteredVenues = venues.results.filter((venue: any) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLoadedVenues(filteredVenues);
    }
  }, [venues, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="lg:w-2/3 bg-white p-4 rounded-lg max-h-[calc(100vh-2rem)]">
        <Map
          userLocation={userLocation}
          searchQuery={searchQuery}
          filters={filters}
          handleSearchChange={handleSearchChange}
          setFilters={setFilters}
        />
      </div>

      <div className="lg:w-1/3 bg-white p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
        {loadedVenues?.map((venue: any, index: number) => {
          const imageSrc = venue.photo ? venue.photo : null;
          return (
            <div className="bg-white p-4 rounded-lg mb-4" key={index}>
              <CardComponent
                selectedVenue={false}
                imageSrc={imageSrc}
                title={venue.name}
                distance={venue.distance}
                description={venue.description || t("homeNoRatingsMessage")}
                buttonText={t("homeAddReviewButton")}
                onButtonClick={() => handleButtonClick()}
              />
            </div>
          );
        })}
      </div>

      <StepperComponent
        isModalOpen={isModalOpen}
        onClose={handleClose}
        stepsData={stepsData}
      />
    </div>
  );
};

export default Home;
