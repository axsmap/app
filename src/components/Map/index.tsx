"use client";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Spinner from "../Spinner";

// Define the map container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

const Map: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({
                  lat: latitude,
                  lng: longitude,
                });
              },
              (err) => {
                console.error("Error getting location:", err);
              }
            );
          } else {
            console.log("Geolocation permission not granted");
          }
        });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  // if (!userLocation)
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  return (
    <div className="bg-gray-200 rounded-lg h-full w-full">
      <div className="h-full w-full bg-gray-400 rounded-lg flex items-center justify-center">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || { lat: 37.0902, lng: -95.7129 }}
          options={{
            restriction: {
              latLngBounds: {
                north: userLocation ? userLocation.lat + 0.1 : 37.1902,
                south: userLocation ? userLocation.lat - 0.1 : 36.9902,
                east: userLocation ? userLocation.lng + 0.1 : -95.6129,
                west: userLocation ? userLocation.lng - 0.1 : -95.8129,
              },
            },
          }}
          zoom={15}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

// const Map: FC = () => (
//   <div className="bg-gray-200 rounded-lg h-full w-full">
//     <div className="h-full w-full bg-gray-400 rounded-lg flex items-center justify-center">
//       <span className="text-white font-bold">Map Placeholder</span>
//     </div>
//   </div>
// );
// export default Map;
