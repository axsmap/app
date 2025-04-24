import { useState, useRef } from "react";
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
import { calculateIconType, getGeneralType } from "@/utils/helperFunction";
import { kebabCase } from "lodash";
import CardComponent from "../Card";
import { stepsData } from "@/utils/helperFunction";
import StepperComponent from "../custom-modal/stepper-component";
import { useVenueQuery } from "@/Services/modules/mapathon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CreateReview from "../addReview/CreateReview";

interface MapProps {
  userLocation: google.maps.LatLngLiteral | null;
  filters: {
    venueType: string;
    participant: string;
    interiorScore: string;
    restroomScore: string;
    parking: string;
  };
  setFilters: (filters: {
    venueType: string;
    participant: string;
    interiorScore: string;
    restroomScore: string;
    parking: string;
  }) => void;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Map: React.FC<MapProps> = ({
  userLocation,
  filters,
  setFilters,
  searchQuery,
  handleSearchChange,
}) => {
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(
      userLocation || { lat: 31.4484022, lng: 74.3922469 }
    );
  const [isDragged, setIsDragged] = useState(false);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries: ["places"],
  });
  const {
    data: venues,
    isLoading,
    refetch,
  } = useVenueQuery({
    location: currentLocation
      ? `${currentLocation.lat},${currentLocation.lng}`
      : "",
    name: searchQuery,
    type: filters?.venueType || "establishment",
    page: "",
  });

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

  const handleCloseInfoWindow = () => {
    setSelectedVenue(null);
    if (mapRef.current) {
      mapRef.current.setZoom(20);
    }
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleApplyFilters = () => {
    setFilterModalOpen(false);
    if (mapRef.current) {
      mapRef.current.setZoom(20);
    }
    refetch();
  };
  const handleMapDragEnd: () => void = () => {
    setIsDragged(true);
  };

  const handleSearchHere = () => {
    if (currentLocation) {
      if (mapRef.current) {
        const newCenter = mapRef.current.getCenter();
        if (newCenter) {
          const lat = newCenter.lat();
          const lng = newCenter.lng();
          setCurrentLocation({ lat, lng });
        }
      }
      setIsDragged(false);
      refetch();
    }
    if (mapRef.current) {
      mapRef.current.setZoom(20);
      mapRef.current.panTo({
        lat: currentLocation?.lat,
        lng: currentLocation?.lng,
      });
    }
  };

  if (!isLoaded || isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="absolute top-10 left-1/2 z-10 w-full max-w-[450px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={searchBoxRef}
            type="text"
            placeholder="Search by category & address (coffee, New York)"
            className="p-3 pl-10 rounded-lg border border-gray-300 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setFilterModalOpen(!isFilterModalOpen)}
          >
            <FilterIcon />
          </button>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={currentLocation || { lat: 37.0902, lng: -95.7129 }}
        zoom={20}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={handleMapDragEnd}
        options={{
          restriction: {
            latLngBounds: {
              north: currentLocation ? currentLocation.lat + 0.1 : 37.1902,
              south: currentLocation ? currentLocation.lat - 0.1 : 36.9902,
              east: currentLocation ? currentLocation.lng + 0.1 : -95.6129,
              west: currentLocation ? currentLocation.lng - 0.1 : -95.8129,
            },
          },
        }}
      >
        {venues?.results?.map((venue: any, index: number) => {
          const venueType = getGeneralType(venue?.types);
          const MARKER_ICON = `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(
            venueType
          )}${calculateIconType(venue.mapMarkerScore)}.svg`;

          return (
            <Marker
              key={index}
              icon={{
                url: MARKER_ICON,
                scaledSize: new google.maps.Size(40, 40),
              }}
              position={{ lat: venue.location.lat, lng: venue.location.lng }}
              onClick={() => handleMarkerClick(venue)}
            />
          );
        })}

        {selectedVenue && (
          <InfoWindow
            position={{
              lat: selectedVenue.location.lat,
              lng: selectedVenue.location.lng,
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <CardComponent
              isSelectedVenue={true}
              selectedVenue={selectedVenue}
              title={selectedVenue.name}
              distance={selectedVenue.distance}
              description={selectedVenue?.description}
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
        onApplyFilters={handleApplyFilters}
        onClearFilters={() => setFilters({ ...filters, venueType: "Select" })}
        onFilterChange={(filterName, value) =>
          setFilters({ ...filters, [filterName]: value })
        }
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-[90vh] w-full">
            <CreateReview
              name={selectedVenue.name}
              placeId={selectedVenue.placeId}
            />
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
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Search Here"
          )}
        </button>
      )}
    </div>
  );
};

export default Map;
