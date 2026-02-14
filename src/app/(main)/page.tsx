"use client";  
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { showToast } from "@/components/toast";
import { useLazyVenueQuery } from "@/Services/modules/mapathon";
import { venueInterface } from "@/Services/modules/mapathon/venue";
import { useAppSelector } from "@/Store";
import _ from "lodash";
import { LocateFixed, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getFormattedDistance } from "@/utils/distance";

const getScore = (str: string) => {
  // API expects: 5 = Accessible (Green), 3 = Caution (Yellow), 1 = Alert (Red)
  if (str === "Any") {
    return "1";  // Alert level or higher
  }
  if (str === "At least Yellow") {
    return "3";  // Caution level or higher
  }
  if (str === "Accessible") {
    return "5";  // Accessible level only
  }
  return undefined;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>({
      lat: 38.7946,
      lng: 106.5348,
    });
  const filters = useAppSelector((state) => state.search);

  // Use the geolocation hook
  const {
    location: userLocation,
    isLoading: locationLoading,
    error: locationError,
    permissionState,
    requestLocation,
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });

  const [fetchVenues, { data: venues, isLoading }] = useLazyVenueQuery();

  // Calculate distances for all venues
  const venuesWithDistance = useMemo(() => {
    if (!venues?.results || !userLocation) {
      return venues?.results || [];
    }

    return venues.results.map((venue) => ({
      ...venue,
      distance: getFormattedDistance(userLocation, venue.location, 'mi'),
    }));
  }, [venues?.results, userLocation]);

  // Request user location on mount (only once)
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Fetch venues when user location is available or filters change
  useEffect(() => {
    const location = userLocation || currentLocation;
    
    fetchVenues({
      location: `${location.lat},${location.lng}`,
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

    if (userLocation) {
      setCurrentLocation(userLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, JSON.stringify(filters)]); // Use JSON.stringify to prevent object reference issues

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
    search,
  }: {
    lat: number;
    lng: number;
    search?: string;
  }) => {
    try {
      fetchVenues({
        location: `${lat},${lng}`,
        name: search !== undefined ? search : filters?.search,
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
      {/* Location Permission Banner */}
      {locationError && permissionState === 'denied' && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mx-4 rounded-md shadow-md">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Location Access Needed</p>
              <p className="text-sm mt-1">
                {locationError} Enable location permissions in your browser settings to see distances from your current location.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        id="list-view"
        className="lg:max-w-[610px]  w-full bg-gray-100 p-4 gap-3 rounded-lg overflow-y-auto max-h-[calc(100vh-155px)] hidden md:grid md:grid-cols-2 grid-cols-1"
      >
        {venuesWithDistance?.map((venue: venueInterface, index: number) => {
          return (
            <div className="bg-white rounded-lg mb-1 cursor-pointer" key={index}>
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
            venues={venuesWithDistance || []}
            userLocation={userLocation}
            refetch={handleRefetch}
            setCurrentLocation={setCurrentLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
