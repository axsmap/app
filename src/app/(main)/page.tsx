// "use client";
// import React, { useState, useEffect } from "react";
// import CardComponent from "@/components/Card";
// import Map from "@/components/Map";
// import { useVenueQuery } from "@/Services/modules/mapathon";
// import { useTranslation } from "react-i18next";
// import CreateReview from "@/components/addReview/CreateReview";
// import { useRouter } from "next/navigation";

// export type Venue = {
//   name: string;
//   photo: string;
//   description: string;
//   placeId: string;
// };

// const Home: React.FC = () => {
//   const { t } = useTranslation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userLocation, setUserLocation] =
//     useState<google.maps.LatLngLiteral | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loadedVenues, setLoadedVenues] = useState<Venue[]>([]);
//   const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
//   const [filters, setFilters] = useState({
//     venueType: "establishment",
//     participant: "",
//     interiorScore: "Any",
//     restroomScore: "Any",
//     parking: "Allowed",
//   });

//   const { data: venues, refetch } = useVenueQuery({
//     location: userLocation ? `${userLocation.lat},${userLocation.lng}` : "",
//     name: searchQuery,
//     type: "",
//     page: "",
//   });

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const router = useRouter();

//   const handleButtonClick = (venue: Venue) => {
//     const query = new URLSearchParams({
//       name: venue.name,
//       placeId: venue.placeId,
//     }).toString();

//     router.push(`/?${query}`);
//     setSelectedVenue(venue);
//     setIsModalOpen(true);
//   };

//   const handleClose = () => {
//     setIsModalOpen(false);
//     setSelectedVenue(null);
//     router.push("/");
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.permissions
//         .query({ name: "geolocation" })
//         .then((permissionStatus) => {
//           if (permissionStatus.state === "granted") {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setUserLocation({ lat: latitude, lng: longitude });
//               },
//               (err) => {
//                 console.error("Error getting location:", err);
//               }
//             );
//           }
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (venues?.results) {
//       const filteredVenues = venues.results.filter((venue: any) =>
//         venue.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setLoadedVenues(filteredVenues);
//     }
//   }, [venues, searchQuery]);

//   const handleRefetch = () => {
//     refetch();
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 p-4">
//       <div className="lg:w-2/3 bg-white p-4 rounded-lg max-h-[calc(100vh-2rem)]">
//         <Map
//           userLocation={userLocation}
//           searchQuery={searchQuery}
//           filters={filters}
//           handleSearchChange={handleSearchChange}
//           setFilters={setFilters}
//         />
//       </div>
//       <div className="lg:w-1/3 bg-white p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
//         {loadedVenues?.map((venue: any, index: number) => {
//           const imageSrc = venue.photo ? venue.photo : null;
//           return (
//             <div className="bg-white p-4 rounded-lg mb-1" key={index}>
//               <CardComponent
//                 isSelectedVenue={false}
//                 selectedVenue={venue}
//                 imageSrc={imageSrc}
//                 title={venue.name}
//                 distance={venue.distance}
//                 description={
//                   venue?.isReviewed
//                     ? venue.description
//                     : t("homeNoRatingsMessage")
//                 }
//                 buttonText={t("homeAddReviewButton")}
//                 onButtonClick={() => handleButtonClick(venue)}
//               />
//             </div>
//           );
//         })}
//       </div>

//       {isModalOpen && selectedVenue && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-4 max-w-[90vh] w-full">
//             <CreateReview handleRefetch={handleRefetch} />
//             <button
//               onClick={handleClose}
//               className="mt-4 text-center w-full text-white bg-red-500 py-2 rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

"use client";
import React, { useState, useEffect } from "react";
import CardComponent from "@/components/Card";
import Map from "@/components/Map";
import { useVenueQuery } from "@/Services/modules/mapathon";
import { useTranslation } from "react-i18next";
import CreateReview from "@/components/addReview/CreateReview";
import { useRouter } from "next/navigation";

export type Venue = {
  name: string;
  photo: string;
  description: string;
  placeId: string;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
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
    location: currentLocation
      ? `${currentLocation.lat},${currentLocation.lng}`
      : "",
    name: searchQuery,
    type: filters.venueType || "establishment",
    page: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setCurrentLocation(location);
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = (venue: Venue) => {
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
    <div className="flex flex-col-reverse lg:flex-row gap-4 px-4 pt-4">
    

      <div className="lg:max-w-[610px] w-full bg-gray-100 p-4 gap-3 rounded-lg overflow-y-auto max-h-[calc(100vh-155px)] grid grid-cols-2">
        {venues?.results?.map((venue: Venue, index: number) => (
          <div className="bg-white rounded-lg mb-1" key={index}>
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
              onButtonClick={() => handleButtonClick(venue)}
            />
          </div>
        ))}
      </div>
  <div className="flex-grow bg-white rounded-lg max-h-[calc(100vh-155px)]">
        <Map
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          venues={venues?.results || []}
          filters={filters}
          setFilters={setFilters}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          refetch={refetch}
        />
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
