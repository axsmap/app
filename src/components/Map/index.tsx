import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Circle,
} from "@react-google-maps/api";
import Spinner from "../Spinner";
import { FilterIcon } from "@/assets/icons/filter-icon";
import SearchIcon from "@/assets/icons/search-icon";
import FilterModal from "../FilterModal/FilterModal";
import CardComponent from "../Card";
import { calculateIconType, getGeneralType } from "@/utils/helperFunction";
import { kebabCase } from "lodash";
import { useRouter } from "next/navigation";
import { LocateFixed } from "lucide-react";
interface MapProps {
  currentLocation: google.maps.LatLngLiteral | null;
  userLocation: google.maps.LatLngLiteral | null;
  setCurrentLocation: (location: google.maps.LatLngLiteral) => void;
  setUserLocation: (location: google.maps.LatLngLiteral) => void;
  venues: any[];
  filters: any;
  setFilters: (filters: any) => void;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refetch?: (e: { lat: number; lng: number }) => void;
}

const Map: React.FC<MapProps> = ({
  currentLocation,
  setCurrentLocation,
  venues,
  filters,
  setFilters,
  searchQuery,
  handleSearchChange,
  refetch,
  userLocation,
  setUserLocation,
}) => {
  const router = useRouter();
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
      mapRef.current.setZoom(19);
      mapRef.current.panTo({
        lat: venue.location.lat,
        lng: venue.location.lng,
      });
      mapRef.current.panBy(0, -200);
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
        mapRef.current.setZoom(19);
        mapRef.current.panTo({
          lat: newLocation.lat,
          lng: newLocation.lng,
        });
        setCurrentLocation(newLocation);
        refetch?.({ lat: newLocation?.lat, lng: newLocation?.lng });
      }
    }
    setIsDragged(false);
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setIsDragged(false);
          setCurrentLocation(location);
          refetch?.({ lat: location?.lat, lng: location?.lng });
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  };

  const handleButtonClick = (name: string, placeId: string) => {
    if (placeId) {
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
            placeholder="Search by category & address (coffee, New York)"
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
        mapContainerStyle={{ width: "100%", height: "calc(100vh - 155px)" }}
        center={currentLocation || { lat: 37.0902, lng: -95.7129 }}
        zoom={19}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: "greedy",
          styles: [
            {
              featureType: "poi",
              elementType: "labels.icon", // hide POI icons
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }], // hide business POIs completely
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
        onClick={() => setSelectedVenue(null)}
        onLoad={(map: google.maps.Map) => {
          mapRef.current = map;
        }}
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
              scaledSize: new google.maps.Size(50, 50),
            }}
          />
        ))}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={1}
            options={{
              fillColor: "#4285F4",
              strokeColor: "#4285F4",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillOpacity: 1,
            }}
          />
        )}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={5} // meters
            options={{
              fillColor: "#4285F4",
              strokeColor: "#4285F4",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillOpacity: 0.2,
            }}
          />
        )}
        {selectedVenue && (
          <InfoWindow
            position={{
              lat: selectedVenue.location.lat + 0.00024,
              lng: selectedVenue.location.lng,
            }}
          >
            <CardComponent
              isSelectedVenue={true}
              selectedVenue={selectedVenue}
              title={selectedVenue.name}
              distance={selectedVenue.distance}
              description={selectedVenue.description}
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
          refetch?.({
            lat: currentLocation?.lat ?? 0,
            lng: currentLocation?.lng ?? 0,
          });
        }}
        onClearFilters={() => setFilters({ ...filters, venueType: "Select" })}
        onFilterChange={(name, value) =>
          setFilters((prev: any) => ({ ...prev, [name]: value }))
        }
      />

      {isDragged && (
        <button
          onClick={handleSearchHere}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-primary text-white rounded-[8px]"
        >
          Search Here
        </button>
      )}

      <button
        onClick={locateMe}
        className="absolute bottom-5 left-1/2 flex gap-x-2 transform -translate-x-1/2 px-6 py-3 bg-gray-500 text-white rounded-[8px]"
      >
        <LocateFixed />
        LOCATE ME
      </button>
    </div>
  );
};

export default Map;
