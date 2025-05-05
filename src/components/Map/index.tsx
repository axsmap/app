import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import Spinner from "../Spinner";
import { FilterIcon } from "@/assets/icons/filter-icon";
import SearchIcon from "@/assets/icons/search-icon";
import FilterModal from "../FilterModal/FilterModal";
import CardComponent from "../Card";
import { calculateIconType, getGeneralType } from "@/utils/helperFunction";
import { kebabCase } from "lodash";
import CreateReview from "../addReview/CreateReview";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface MapProps {
  userLocation: google.maps.LatLngLiteral | null;
  setUserLocation: (location: google.maps.LatLngLiteral) => void;
  venues: any[];
  filters: any;
  setFilters: (filters: any) => void;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
}

const Map: React.FC<MapProps> = ({
  userLocation,
  setUserLocation,
  venues,
  filters,
  setFilters,
  searchQuery,
  handleSearchChange,
  refetch,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleMarkerClick = (venue: any) => {
    setSelectedVenue(venue);
    if (mapRef.current) {
      mapRef.current.setZoom(20);
      mapRef.current.panTo({
        lat: venue.location.lat,
        lng: venue.location.lng,
      });
    }
  };

  const handleMapDragEnd = () => {
    setIsDragged(true);
  };

  const handleSearchHere = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newLocation = { lat: center.lat(), lng: center.lng() };
        setUserLocation(newLocation);
        refetch();
      }
    }
    setIsDragged(false);
  };

  const handleButtonClick = () => {
    if (selectedVenue) {
      const { placeId, name } = selectedVenue;
      router.push(`/?name=${name}&placeId=${placeId}`);
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="absolute top-10 left-1/2 z-10 w-full max-w-[450px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholderLabel")}
            className="p-3 pl-10 rounded-lg border border-gray-300 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setFilterModalOpen(true)}
          >
            <FilterIcon />
          </button>
        </div>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={userLocation || { lat: 37.0902, lng: -95.7129 }}
        zoom={20}
        onDragEnd={handleMapDragEnd}
      >
        {venues?.map((venue, idx) => (
          <Marker
            key={idx}
            position={{ lat: venue.location.lat, lng: venue.location.lng }}
            onClick={() => handleMarkerClick(venue)}
            icon={{
              url: `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(
                getGeneralType(venue?.types)
              )}${calculateIconType(venue.mapMarkerScore)}.svg`,
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        ))}
        {selectedVenue && (
          <InfoWindow
            position={{
              lat: selectedVenue.location.lat,
              lng: selectedVenue.location.lng,
            }}
            onCloseClick={() => setSelectedVenue(null)}
          >
            <CardComponent
              isSelectedVenue={true}
              selectedVenue={selectedVenue}
              title={selectedVenue.name}
              distance={selectedVenue.distance}
              description={
                selectedVenue?.isReviewed
                  ? selectedVenue.description
                  : t("homeNoRatingsMessage")
              }
              buttonText="Add Review"
              onButtonClick={handleButtonClick}
            />
          </InfoWindow>
        )}
      </GoogleMap>

      <FilterModal
        filters={filters}
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilters={() => {
          setFilterModalOpen(false);
          refetch();
        }}
        onClearFilters={() => setFilters({ ...filters, venueType: "Select" })}
        onFilterChange={(name, value) =>
          setFilters((prev: any) => ({ ...prev, [name]: value }))
        }
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-[90vh] w-full">
            <CreateReview handleRefetch={refetch} />
            <button
              onClick={handleClose}
              className="mt-4 text-center w-full text-white bg-red-500 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isDragged && (
        <button
          onClick={handleSearchHere}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-500 text-white rounded-full"
        >
          Search Here
        </button>
      )}
    </div>
  );
};

export default Map;
